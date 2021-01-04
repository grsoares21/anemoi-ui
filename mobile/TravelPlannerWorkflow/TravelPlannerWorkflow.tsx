import React, { useReducer, useState } from 'react';
import CitySelectionWorkflow from './CitySelectionWorkflow/CitySelectionWorkflow';
import StayPeriodWorkflow from './StayPeriodWorfklow/StayPeriodWorkflow';
import TravelPeriodWorkflow from './TravelPeriodWorkflow/TravelPeriodWorkflow';
import { WorkflowSection } from './TravelPlannerWorkflow.d';
import { TravelPlannerWorkflowContext, TravelPlannerWorkflowReducer } from './TravelPlannerWorkflow.state';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import NavigationTabBar from './NavigationTabBar/NavigationTabBar';
import TravelPlanResult from './TravelPlanResult/TravelPlanResult';

interface TravelPlannerWorkflowProps {
  launchWorkflow: boolean;
}

const Navigation = createMaterialTopTabNavigator();

const TravelPlannerWorkflow: React.FC<TravelPlannerWorkflowProps> = props => {
  const [workflowSection, updateWorkflowSection] = useState(WorkflowSection.StayPeriod);

  const [state, dispatch] = useReducer(TravelPlannerWorkflowReducer, {
    departureCities: [],
    arrivalCities: [],
    visitingCities: [],
    departureDateRange: { startDate: null, endDate: null },
    arrivalDateRange: { startDate: null, endDate: null },
    maxStopsPerRoute: 5,
    noOfTravelers: 1,
    preferredCriteria: 'price'
  });

  return (
    <TravelPlannerWorkflowContext.Provider value={{ state, dispatch }}>
      <NavigationContainer
        onStateChange={navigationState => {
          if (navigationState && navigationState.index + 1 > workflowSection) {
            updateWorkflowSection(navigationState.index + 1);
          }
        }}
      >
        <Navigation.Navigator
          swipeEnabled={false}
          tabBar={props => <NavigationTabBar {...props} currentWorkflowSection={workflowSection} />}
        >
          <Navigation.Screen name="CitySelection" component={CitySelectionWorkflow} />
          <Navigation.Screen name="StayPeriod" component={StayPeriodWorkflow} />
          <Navigation.Screen name="TravelPeriod" component={TravelPeriodWorkflow} />
          <Navigation.Screen name="TravelPlanResult" component={TravelPlanResult} />
        </Navigation.Navigator>
      </NavigationContainer>
    </TravelPlannerWorkflowContext.Provider>
  );
};

export default TravelPlannerWorkflow;
