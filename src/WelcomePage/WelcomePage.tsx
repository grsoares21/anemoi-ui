import React, { useState, useRef, useEffect } from 'react';

import { Row, Col, Button } from 'react-bootstrap';
import posed from 'react-pose';

import WelcomePhrase from './WelcomePhrase/WelcomePhrase';
import WelcomePageLogo from './WelcomePageLogo';

import './WelcomePage.scss';
import AnemoiTitle from './AnemoiTitle';

const collapseDuration = 500;

const PageAnimation = posed.div({
  open: { height: '100vh' },
  collapsed: {
    height: '50px',
    transition: {
      ease: [0.455, 0.030, 0.515, 0.955],
      duration: collapseDuration
    }
  }
});

const ContentAnimation = posed.div({
  open: { opacity: 1 },
  collapsed: {
    opacity: 0,
    transition: {
      ease: 'linear',
      duration: 200
    }
  }
});


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

  const poseString = welcomeCollapsed ? 'collapsed' : 'open';

  const buttonRef = useRef<any>();

  useEffect(() => buttonRef.current.focus(), []);
  // focus on "yes" button on first load

  return (
    <PageAnimation className="WelcomePage" pose={poseString} onPoseComplete={onCollapseFinished}>
      <AnemoiTitle isVisible={collapseFinished} />
      <ContentAnimation pose={poseString} className="h-100">
        <Row className="h-100">
          <Col xs={{ span: 12, order: 2 }} md={{ span: 6, order: 1 }}>
            <Row className="h-100">
                <Col xs={{ span: 10, offset: 1 }} className="my-auto">
                <WelcomePhrase />
                <Button ref={buttonRef} size="lg" variant="primary" onClick={() => setWelcomeCollapsed(true)}>
                  <b>Sim!</b>
                </Button>
              </Col>
            </Row>
          </Col>
          <Col xs={{ span: 12, order: 1 }} md={{ span: 6, order: 1 }}>
            <WelcomePageLogo />
          </Col>
        </Row>
      </ContentAnimation>
    </PageAnimation>
  );
}

export default WelcomePage;