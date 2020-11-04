import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import TravelPlannerWorkflow from './TravelPlannerWorkflow/TravelPlannerWorkflow';
import WelcomePage from './WelcomePage/WelcomePage';

export default function App(): React.ReactNode {
  const [welcomePageCollapsed, setWelcomePageCollapsed] = useState(false);

  return (
    <>
      <WelcomePage collapseCallback={() => setWelcomePageCollapsed(true)} />
      <TravelPlannerWorkflow launchWorkflow={welcomePageCollapsed} />
      <StatusBar style="auto" />
    </>
  );
}