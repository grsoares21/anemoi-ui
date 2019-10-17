import React from 'react';

import { Row, Col } from 'react-bootstrap';

import logo from './compass.svg';
import './WelcomePage.scss';

const WelcomePageLogo: React.FC = () => {
  return (
    <Row className="h-100">
      <Col xs={{ span: 6, offset: 3 }} className="my-auto">
        <img src={logo} alt="Logo" />
      </Col>
    </Row>
  );
};

export default WelcomePageLogo;
