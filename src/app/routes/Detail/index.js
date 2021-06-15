import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {isLoading} from 'store/selectors';
import {GET_ONE_POKEMON, CATCH_POKEMON} from "constants/ActionTypes";
import {getPokemonDetail, catchPokemon, savePokemon, releasePokemon} from 'actions/Pokemon';
import StatsChart from 'components/Chart/StatsChart';

import {
  Card,
  Typography,
  Descriptions,
  Button,
  Popconfirm,
  Avatar,
  Badge,
  Image,
  Row,
  Col,
  Tag,
  Tabs,
  Layout,
  Modal,
  Result,
  Form,
  Input,
  List,
  Space
} from 'antd';
import {CrownOutlined, FrownOutlined, BackwardOutlined} from '@ant-design/icons';

const VIEW_COMMON = 'view-common';
const VIEW_MOVE = 'view-move';
const VIEW_STATS = 'view-stats';
const VIEW_OWNED = 'view-owned';

const PokemonDetailUI = ({history, match, detail, owned, caught, isLoading, getPokemonDetail, catchPokemon, savePokemon, releasePokemon}) => {

  useEffect(() => {
    const {pokemon} = match.params;
    getPokemonDetail({name: pokemon})
  }, []);

  const isOwned = (name) => owned.filter(own => own.name === name).length;

  return (
    <Space direction="vertical" style={{width: '100%'}}>
      <Button type="link" icon={<BackwardOutlined/>} onClick={() => history.goBack()}>Back</Button>
      <Card
        loading={isLoading(GET_ONE_POKEMON)}
        style={{width: '100%'}}
        cover={<img style={{height: 100}} alt="example" src="https://via.placeholder.com/200/1890ff/1890ff?Text="/>}
      >
        {detail &&
        <div style={{bottom: 125, position: 'relative'}}>
          <Row justify="center" align="middle">
            <Col>
              <Image
                width={200}
                src={detail.sprites.front_default}
              />
            </Col>
          </Row>
          <Row justify="center" align="middle">
            <Typography.Title
              level={3}>{detail.name.charAt(0).toUpperCase() + detail.name.slice(1)}</Typography.Title>
          </Row>
          <Row justify="center" align="middle">
            {detail.types.map(({type}) => <Tag
              color="geekblue">{type.name.charAt(0).toUpperCase() + type.name.slice(1)}</Tag>)}
            {isOwned(detail.name) !== 0 && <Tag color="gold"><CrownOutlined/> Owned</Tag>}
          </Row>
          <Tabs defaultActiveKey={VIEW_COMMON} centered>
            <Tabs.TabPane tab="Info" key={VIEW_COMMON}>
              <CommonInfo data={detail}/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Stats" key={VIEW_STATS}>
              <StatsChart
                identifier={'pokemon-stats'}
                data={detail.stats.map(({base_stat, stat}) => ({stat: stat.name, score: base_stat}))}
                style={{width: '100%', height: 200}}/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Move" key={VIEW_MOVE}>
              <Move data={detail}/>
            </Tabs.TabPane>
            {isOwned(detail.name) &&
            <Tabs.TabPane tab={<>Owned <Badge count={isOwned(detail.name)}/></>} key={VIEW_OWNED}>
              <Owned owned={owned.filter(own => own.name === detail.name)} onRelease={releasePokemon}/>
            </Tabs.TabPane>}
          </Tabs>
        </div>}
      </Card>

      <Layout.Footer style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: 0}}>
        {detail && <Button type="primary" size="large" icon={<CrownOutlined/>} onClick={() => catchPokemon(detail)}
                           block>Catch!</Button>}
      </Layout.Footer>

      <Modal visible={isLoading(CATCH_POKEMON)} footer={null} closable={false} centered>
        {detail &&
        <Result
          status="success"
          icon={<Image width={200} src={detail.sprites.front_default}/>}
          subTitle="Catching pokemon..."
        />}
      </Modal>

      <Modal visible={caught} footer={null} closable={false} centered>
        {detail &&
        <>
          <Result
            status="success"
            icon={<Image width={200} src={detail.sprites.front_default}/>}
            title="Congratulations!"
            subTitle={`You have caught ${detail.name}.`}
          />
          <Form
            name="pokemon-save"
            onFinish={({nickname}) => savePokemon(nickname, detail)}
          >
            <Form.Item
              name="nickname"
              rules={[
                {required: true, message: 'Please input pokemon nickname!'},
                ({getFieldValue}) => ({
                  validator(_, value) {
                    if (!value || owned.filter(({nickname}) => nickname === value).length === 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Nickname must be unique!'));
                  },
                })
              ]}
            >
              <Input placeholder="Nickname"/>
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </>}
      </Modal>

      <Modal visible={caught === false} footer={null} closable={false} centered>
        <Result
          status="error"
          icon={<FrownOutlined/>}
          subTitle="Sorry, you need to try again later."
        />
        <Button type="primary" danger block onClick={() => savePokemon()}>Close</Button>
      </Modal>
    </Space>
  );
};

const mapStateToProps = (store) => {
  const {pokemon: {detail, owned, caught}} = store;
  return {
    isLoading: isLoading(store), detail, owned, caught
  }
};

export default connect(mapStateToProps, {getPokemonDetail, catchPokemon, savePokemon, releasePokemon})(PokemonDetailUI);

const CommonInfo = ({data}) => (
  <Descriptions title="Pokemon Info" layout="vertical">
    <Descriptions.Item key="height" label="Height">{`${data.weight} kilos`}</Descriptions.Item>
    <Descriptions.Item key="weight" label="Weight">{`${data.height} meters`}</Descriptions.Item>
    <Descriptions.Item key="abilities" label="Abilities">
      {data.abilities.map(({ability}) => <Tag key={ability.name} color="volcano">{ability.name.charAt(0).toUpperCase() + ability.name.slice(1)}</Tag>)}
    </Descriptions.Item>
  </Descriptions>
);

const Move = ({data}) => (
  <>
    {data.moves.map(({move}) => <Tag key={move.name} color="purple" style={{marginBottom: 8}}>{move.name.charAt(0).toUpperCase() + move.name.slice(1)}</Tag>)}
  </>
);

const Owned = ({owned, onRelease}) => (
  <List
    itemLayout="horizontal"
    dataSource={owned}
    renderItem={item => (
      <List.Item
        actions={[
          <Popconfirm
            placement="topRight"
            title="Are you really want to release?"
            onConfirm={() => onRelease(item)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>Release</Button>
          </Popconfirm>
        ]}
      >
        <List.Item.Meta
          key={item.name}
          avatar={<Avatar src={item.sprites.front_default}/>}
          title={item.nickname}
          description={item.name}
        />
      </List.Item>
    )}
  />
);