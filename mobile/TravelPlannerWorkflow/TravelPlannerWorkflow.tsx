import React, { useEffect, useReducer, useState } from 'react';
import CitySelectionWorkflow from './CitySelectionWorkflow/CitySelectionWorkflow';
import StayPeriodWorkflow from './StayPeriodWorfklow/StayPeriodWorkflow';
import TravelPeriodWorkflow from './TravelPeriodWorkflow/TravelPeriodWorkflow';
import { WorkflowSection } from './TravelPlannerWorkflow.d';
import { TravelPlannerWorkflowContext, TravelPlannerWorkflowReducer } from './TravelPlannerWorkflow.state';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

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

  useEffect(() => {
    if (!props.launchWorkflow) return;
    let timeOutToClear: ReturnType<typeof setTimeout>;
    switch (workflowSection) {
      // defines the side effects for each workflow step
      case WorkflowSection.Beginning:
        timeOutToClear = setTimeout(() => updateWorkflowSection(WorkflowSection.CitySelection), 300);
        break;
      case WorkflowSection.StayPeriodIntroduction:
        timeOutToClear = setTimeout(() => updateWorkflowSection(WorkflowSection.StayPeriod), 300);
        break;
      /*case WorkflowSection.CalculateTravelPlan:
        submitButtonRef.current.focus();
        break;*/
      default:
        break;
    }
    let cleanUpFunction = () => clearTimeout(timeOutToClear);
    return cleanUpFunction;
  }, [workflowSection, props.launchWorkflow]);

  return (
    <TravelPlannerWorkflowContext.Provider value={{ state, dispatch }}>
      <NavigationContainer>
        <Navigation.Navigator>
          <Navigation.Screen name="euzeruz" component={CitySelectionWorkflow} />
          <Navigation.Screen name="StayPeriod" component={StayPeriodWorkflow} />
          <Navigation.Screen name="TravelPeriod" component={TravelPeriodWorkflow} />
        </Navigation.Navigator>
      </NavigationContainer>
    </TravelPlannerWorkflowContext.Provider>
  );
};

export default TravelPlannerWorkflow;
