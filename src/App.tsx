import './App.scss';

import React, { useState, useEffect } from 'react';
import WelcomePage from './WelcomePage/WelcomePage';
import TravelPlannerWorkflow from './TravelPlannerWorkflow/TravelPlannerWorkflow';
import { currencyList, CurrencyContext } from './Shared/CurrecyContext';
import LocaleCurrency from 'locale-currency';
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
  const [currency, setCurrency] = useState('USD');
  const { i18n } = useTranslation();

  useEffect(() => {
    const detectedCurrency = LocaleCurrency.getCurrency(i18n.language);
    // if it's on our list of currencies
    if(currencyList.some((curr) => curr === detectedCurrency)) {
      setCurrency(detectedCurrency);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let [welcomePageCollapsed, setWelcomePageCollapsed] = useState(false);
  return (
    <div className="App">
      <CurrencyContext.Provider value={{currency, setCurrency}}>
        <WelcomePage collapseCallback={() => setWelcomePageCollapsed(true)} />
        <TravelPlannerWorkflow launchWorkflow={welcomePageCollapsed} />
      </CurrencyContext.Provider>
    </div>
  );
}

export default App;
