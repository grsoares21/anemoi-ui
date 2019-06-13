  import React, { useState } from 'react';

import { Row } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';

import WelcomePhrase from './WelcomePhrase';
import WelcomePageLogo from './WelcomePageLogo';

import './WelcomePage.scss';

const collapseDuration = 0.5;

const WelcomePage: React.FC = () => {
  var [welcomeCollapsed, setWelcomeCollapsed] = useState(false);
  var [collapseFinished, setCollapseFinished] = useState(false);

  return (
    <div className="WelcomePage" style={{
      height: welcomeCollapsed ? "50px" : "100vh",
      transition: `height ${collapseDuration}s cubic-bezier(0.455, 0.030, 0.515, 0.955)`
    }}>
      {collapseFinished && 
        <CSSTransition enter={false} appear={true} in={collapseFinished} timeout={200} classNames="AnemoiTitle">
          <h3>Anemoi</h3>
        </CSSTransition>
      }
      <CSSTransition in={welcomeCollapsed} timeout={200} classNames="WelcomeContent" onEntered={() => setCollapseFinished(true)} >
        <Row className="h-100">
          <WelcomePhrase collapse={() => setWelcomeCollapsed(true)} />
          <WelcomePageLogo />
        </Row>
      </CSSTransition>
    </div>
  );
}

export default WelcomePage;
