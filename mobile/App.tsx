import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TravelPlannerWorkflow from './TravelPlannerWorkflow/TravelPlannerWorkflow';
import WelcomePage from './WelcomePage/WelcomePage';

export default function App(): React.ReactNode {
  return (
    <>
      <SafeAreaProvider>
        <WelcomePage />
        <TravelPlannerWorkflow />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </>
  );
}
