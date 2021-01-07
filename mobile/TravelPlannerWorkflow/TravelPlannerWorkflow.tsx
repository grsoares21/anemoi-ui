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
import Pager from '../shared/Pager/Pager';

interface TravelPlannerWorkflowProps {
  launchWorkflow: boolean;
}

const Navigation = createMaterialTopTabNavigator();

const TravelPlannerWorkflow: React.FC<TravelPlannerWorkflowProps> = props => {
  const [workflowSection, updateWorkflowSection] = useState(WorkflowSection.CitySelection);

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
  console.log(`Workflow section: ${workflowSection}`);

  return (
    <TravelPlannerWorkflowContext.Provider value={{ state, dispatch }}>
      <NavigationContainer
        onStateChange={navigationState => {
          if (navigationState && navigationState.index > workflowSection) {
            updateWorkflowSection(navigationState.index);
          }
        }}
      >
        <Navigation.Navigator
          pager={props => (
            <Pager {...props} preventSwipeLeftOn={[0, 1, 2, 3].filter(index => index >= workflowSection)} />
          )}
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
