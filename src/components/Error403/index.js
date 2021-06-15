import React from 'react';
import {Link} from 'react-router-dom';
import IntlMessages from 'util/IntlMessages';
import { Result, Button, Row, Col } from 'antd';

const Error403 = () => (
  <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
    <Col>
      <Result
        status="403"
        title="403"
        subTitle={<IntlMessages id={'extraPages.403Msg'}/>}
        extra={
          <Link to={'/'}>
            <Button type="primary"><IntlMessages id={'extraPages.goHome'}/></Button>
          </Link>
        }
      />
    </Col>
  </Row>
);

export default Error403;
