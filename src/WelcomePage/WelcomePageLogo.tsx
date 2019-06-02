import React from 'react';

import { Row, Col } from 'react-bootstrap';

import logo from './compass.svg';
import './WelcomePage.scss';

const WelcomePageLogo: React.FC = () => {
  return (
    <Col xs={{span: 12, order: 1}} md={{ span: 6, order: 2 }}>
      <Row className="h-100">
        <Col xs={{ span: 8, offset: 2}} className="my-auto">
          <img src={logo} alt="Logo" className="WelcomePageLogo" />
        </Col>
      </Row>
    </Col>
  );
}

export default WelcomePageLogo;
