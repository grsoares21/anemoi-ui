import React, { useState } from 'react';

import { Row, Col, Button } from 'react-bootstrap';
import WelcomePhrase from './WelcomePhrase';

import logo from './compass.svg';
import './WelcomePage.scss';

const WelcomePage: React.FC = () => {
  var [welcomeCollapsed, setWelcomeCollapsed] = useState(false);

  return (
    <div className="WelcomePage" style={{height: welcomeCollapsed ? "50px" : "100vh"}}>
      <Row className="h-100 WelcomeContent" style={{opacity: welcomeCollapsed ? 0 : 1}}>
        <Col xs={{span: 12, order: 2}} md={{ span: 6, order: 1 }}>
          <Row className="h-100">
            <Col xs={{ span: 10, offset: 1}} className="my-auto">
              <WelcomePhrase />
              <Button size="lg" variant="primary" onClick={() => {setWelcomeCollapsed(true)}}>
                <b>Sim!</b>
              </Button>
            </Col>
          </Row>
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
