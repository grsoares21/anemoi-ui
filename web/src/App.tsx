import './App.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'rheostat/initialize';
import 'rheostat/css/rheostat.css';

import React, { useState } from 'react';
import WelcomePage from './WelcomePage/WelcomePage';
import TravelPlannerWorkflow from './TravelPlannerWorkflow/TravelPlannerWorkflow';
import { CurrencyContext } from './Shared/CurrecyContext';
import { ThemeContext, Theme } from './Shared/ThemeContext';

const App: React.FC = () => {
  const [currency, setCurrency] = useState('USD');
  const [theme, setTheme] = useState<Theme>("LIGHT");

  let [welcomePageCollapsed, setWelcomePageCollapsed] = useState(false);
  return (
    <div className={`App ${theme === "DARK" ? "Dark" : ""}`} data-testid="app-container">
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <CurrencyContext.Provider value={{ currency, setCurrency }}>
          <WelcomePage collapseCallback={() => setWelcomePageCollapsed(true)} />
          <TravelPlannerWorkflow launchWorkflow={welcomePageCollapsed} />
        </CurrencyContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
};

export default App;
