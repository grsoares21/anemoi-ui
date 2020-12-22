import { City } from '@anemoi-ui/services/LocationServices';
import React, { useEffect, useReducer, useState } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import Button from '../shared/Button/Button';
import CitySelectionWorkflow from './CitySelectionWorkflow/CitySelectionWorkflow';
import StayPeriodWorkflow from './StayPeriodWorfklow/StayPeriodWorkflow';
import TravelPeriodWorkflow from './TravelPeriodWorkflow/TravelPeriodWorkflow';
import { CityStayPeriod, WorkflowSection } from './TravelPlannerWorkflow.d';
import { TravelPlannerWorkflowContext, TravelPlannerWorkflowReducer } from './TravelPlannerWorkflow.state';
import WorkflowStep from './WorkflowStep/WorkflowStep';

interface TravelPlannerWorkflowProps {
  launchWorkflow: boolean;
}

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
      <ScrollView>
        {props.launchWorkflow && (
          <WorkflowStep>
            <Text style={styles.title}>Ótimo, então vamos lá!</Text>
          </WorkflowStep>
        )}
        {workflowSection >= WorkflowSection.CitySelection && (
          <WorkflowStep>
            <CitySelectionWorkflow />
          </WorkflowStep>
        )}
        {workflowSection >= WorkflowSection.StayPeriodIntroduction && (
          <WorkflowStep>
            <Text style={styles.title}>
              Soa como um bom plano! Para te ajudar a planejar ele, vou precisar saber por volta de quantos dias você
              deseja ficar em cada cidade:
            </Text>
          </WorkflowStep>
        )}
        {workflowSection >= WorkflowSection.StayPeriod && (
          <WorkflowStep>
            <StayPeriodWorkflow />
          </WorkflowStep>
        )}
        {workflowSection >= WorkflowSection.TravelPeriod && (
          <WorkflowStep>
            <Text style={styles.title}>Anotado!</Text>
            <Text style={styles.highlightedTitle}>Para quando você está planejando esta viagem?</Text>
            <TravelPeriodWorkflow />
          </WorkflowStep>
        )}
      </ScrollView>
    </TravelPlannerWorkflowContext.Provider>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#6c757d'
  },
  highlightedTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FC427B'
  }
});

export default TravelPlannerWorkflow;
