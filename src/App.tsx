import './App.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'rheostat/initialize';
import 'rheostat/css/rheostat.css';

import React, { useState } from 'react';
import WelcomePage from './WelcomePage/WelcomePage';
import TravelPlannerWorkflow from './TravelPlannerWorkflow/TravelPlannerWorkflow';
import { CurrencyContext } from './Shared/CurrecyContext';

const App: React.FC = () => {
  const [currency, setCurrency] = useState('USD');

  let [welcomePageCollapsed, setWelcomePageCollapsed] = useState(false);
  return (
    <div className="App" data-testid="app-container">
      <CurrencyContext.Provider value={{ currency, setCurrency }}>
        <WelcomePage collapseCallback={() => setWelcomePageCollapsed(true)} />
        <TravelPlannerWorkflow launchWorkflow={welcomePageCollapsed} />
      </CurrencyContext.Provider>
    </div>
  );
};

export default App;
