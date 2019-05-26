import React from 'react';

import { Row, Col, Button } from 'react-bootstrap';
import WelcomePhrase from './WelcomePhrase';

import logo from './compass.svg';
import './WelcomePage.scss';

const WelcomePage: React.FC = () => {
  return (
    <div className="WelcomePage">
      <Row className="h-100">
<<<<<<< HEAD
        <Col xs={{span: 12, order: 2}} md={{ span: 6, order: 1 }}>
=======
        <Col xs={{span: 12, order: 2}} md={{ span: 6, order: 1 }} className="my-auto">
>>>>>>> Added catch phrase and logo to welcome page
          <WelcomePhrase />
          <Button size="lg" variant="primary"><b>Sim!</b></Button>
        </Col>
        <Col xs={{span: 12, order: 1}} md={{ span: 6, order: 2 }}>
          <Row className="h-100">
            <Col xs={{ span: 8, offset: 2}} className="my-auto">
              <img src={logo} alt="Logo" className="WelcomePageLogo" />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default WelcomePage;
