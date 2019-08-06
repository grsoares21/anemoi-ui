import './App.scss';

import React, { useState } from 'react';
import WelcomePage from './WelcomePage/WelcomePage';
import TravelPlannerWorkflow from './TravelPlannerWorkflow/TravelPlannerWorkflow';

const App: React.FC = () => {
  let [welcomePageCollapsed, setWelcomePageCollapsed] = useState(false);
  return (
    <div className="App">
      <WelcomePage collapseCallback={() => setWelcomePageCollapsed(true)} />
      <TravelPlannerWorkflow launchWorkflow={welcomePageCollapsed} />
    </div>
  );
}

export default App;
