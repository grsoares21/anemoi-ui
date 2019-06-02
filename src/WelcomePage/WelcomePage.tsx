import React, { useState, useEffect } from 'react';

import { Row } from 'react-bootstrap';
import WelcomePhrase from './WelcomePhrase';
import WelcomePageLogo from './WelcomePageLogo';

import './WelcomePage.scss';

const collapseDuration = 0.5;

const WelcomePage: React.FC = () => {
  var [welcomeCollapsed, setWelcomeCollapsed] = useState(false);
  var [collapseFinished, setCollapseFinished] = useState(false);
  var [anemoiDisplayed, setAnemoiDisplayed] = useState(false);

  useEffect(() => {
    if (collapseFinished) setAnemoiDisplayed(true);
  }, [collapseFinished])

  return (
    <div className="WelcomePage" style={{
      height: welcomeCollapsed ? "50px" : "100vh",
      transition: `height ${collapseDuration}s cubic-bezier(0.455, 0.030, 0.515, 0.955)`
    }}>
      {collapseFinished ?
        <h3 style={{ opacity: anemoiDisplayed ? 1 : 0 }}>Anemoi</h3> :
        (<Row className="h-100 WelcomeContent" style={{ opacity: welcomeCollapsed ? 0 : 1 }}>
          <WelcomePhrase collapse={() => {
            setWelcomeCollapsed(true);
            setTimeout(() => { setCollapseFinished(true) }, collapseDuration * 1000);
          }} />
          <WelcomePageLogo />
        </Row>)
      }
    </div>
  );
}

export default WelcomePage;
