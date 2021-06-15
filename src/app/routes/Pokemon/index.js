import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {isLoading} from 'store/selectors';
import {GET_ALL_POKEMON} from "constants/ActionTypes";
import {getAllPokemon} from 'actions/Pokemon';
import './index.css';

import {
  Card,
  Empty,
  Row,
  Col,
  Space,
  Typography,
  Button,
  Radio,
  Avatar,
  Badge
} from 'antd';
import {DownOutlined} from '@ant-design/icons';

const VIEW_LIST = 'view-list';
const VIEW_OWNED = 'view-owned';

const PokemonUI = ({history, match, list, owned, limit, offset, isLoading, getAllPokemon}) => {

  const [view, setView] = useState(VIEW_LIST);

  useEffect(() => {
    getAllPokemon({limit, offset})
  }, []);

  const loadMore = () => getAllPokemon({limit, offset});

  const isOwned = (name) => owned.filter(own => own.name === name).length;

  return (
    <Space direction="vertical" style={{width: '100%'}} size="large">
      <Row justify="center" align="middle">
        <Col>
          <img src={process.env.PUBLIC_URL + '/logo-pokemon.png'} alt="pokemon logo" style={{height: 75}}/>
        </Col>
      </Row>
      <Radio.Group defaultValue={VIEW_LIST} buttonStyle="solid" onChange={(e) => setView(e.target.value)}>
        <Radio.Button value={VIEW_LIST}>List</Radio.Button>
        <Radio.Button value={VIEW_OWNED}>Owned</Radio.Button>
      </Radio.Group>
      {view === VIEW_LIST &&
      <Space direction="vertical" style={{width: '100%'}}>
        <>
          {list.map(({id, name, artwork}) => (
            <Typography.Link key={name} onClick={() => history.push(`${match.url}/${name}`)}>
              <Card className={'pokemon-box'} style={{width: '100%'}}>
                <Card.Meta
                  avatar={
                    <>
                      {isOwned(name) ?
                        <Badge count={isOwned(name)}><Avatar size={64} src={artwork}/></Badge> :
                        <Avatar size={64} src={artwork}/>}
                    </>
                  }
                  title={name.charAt(0).toUpperCase() + name.slice(1)}
                  description={`#${id}`}
                />
              </Card>
            </Typography.Link>
          ))}
        </>
        {isLoading(GET_ALL_POKEMON) &&
        <Card style={{width: '100%'}} loading={isLoading(GET_ALL_POKEMON)}>
          <Card.Meta
            avatar={
              <Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
            }
            title="Card title"
            description="This is the description"
          />
        </Card>}
        <Button type="link" icon={<DownOutlined/>} onClick={loadMore} loading={isLoading(GET_ALL_POKEMON)} block>Load
          More</Button>
      </Space>}
      {view === VIEW_OWNED &&
      <>
        {owned.length ?
          <Space direction="vertical" style={{width: '100%'}}>
            <>
              {owned.map(({name, nickname, sprites}) => (
                <Typography.Link link={name} onClick={() => history.push(`${match.url}/${name}`)}>
                  <Card className={'pokemon-box'} style={{width: '100%'}}>
                    <Card.Meta
                      avatar={<Avatar size={64} src={sprites.front_default}/>}
                      title={name.charAt(0).toUpperCase() + name.slice(1)}
                      description={nickname}
                    />
                  </Card>
                </Typography.Link>
              ))}
            </>
          </Space> :
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
        }
      </>}
    </Space>
  );
};

const mapStateToProps = (store) => {
  const {pokemon: {list, owned, params: {limit, offset}}} = store;
  return {
    isLoading: isLoading(store), list, owned, limit, offset
  }
};

export default connect(mapStateToProps, {getAllPokemon})(PokemonUI);