import React, { useState } from 'react';

import { Row, Col } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';

import WelcomePhrase from './WelcomePhrase';
import WelcomePageLogo from './WelcomePageLogo';

import './WelcomePage.scss';

const collapseDuration = 0.5;

interface WelcomePageProps {
  collapseCallback: Function
}

const WelcomePage: React.FC<WelcomePageProps> = props => {
  let [welcomeCollapsed, setWelcomeCollapsed] = useState(false);
  let [collapseFinished, setCollapseFinished] = useState(false);

  let onCollapseFinished = () => {
    setCollapseFinished(true);
    props.collapseCallback();
  }

  return (
    <div className="WelcomePage" style={{
      height: welcomeCollapsed ? "50px" : "100vh",
      transition: `height ${collapseDuration}s cubic-bezier(0.455, 0.030, 0.515, 0.955)`
    }}>
      {collapseFinished &&
        <CSSTransition enter={false} appear={true} in={collapseFinished} timeout={200} classNames="AnemoiTitleAnim">
          <h3>Anemoi</h3>
        </CSSTransition>
      }
      <CSSTransition
        in={welcomeCollapsed}
        timeout={collapseDuration * 1000}
        classNames="WelcomeContentAnim"
        onEntered={onCollapseFinished}>
        <Row className="h-100">
          <Col xs={{ span: 12, order: 2 }} md={{ span: 6, order: 1 }}>
            <WelcomePhrase collapse={() => setWelcomeCollapsed(true)} />
          </Col>
          <Col xs={{ span: 12, order: 1 }} md={{ span: 6, order: 1 }}>
            <WelcomePageLogo />
          </Col>
        </Row>
      </CSSTransition>
    </div>
  );
}

export default WelcomePage;
