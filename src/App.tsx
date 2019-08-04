import './App.scss';

import React, { useState } from 'react';
import WelcomePage from './WelcomePage/WelcomePage';
import TravelPlannerWorkflow from './TravelPlannerWorkflow/TravelPlannerWorkflow';

const App: React.FC = () => {
  let [welcomePageCollapsed, setWelcomePageCollapsed] = useState(false);
  return (
    <div className="App">
      <WelcomePage collapseCallback={() => setWelcomePageCollapsed(true)} />
      <div className="TravelPlannerWorkflow" style={{display: welcomePageCollapsed ? 'block' : 'none'}}>
        <TravelPlannerWorkflow launchWorkflow={welcomePageCollapsed} />
      </div>
    </div>
  );
}

export default App;
