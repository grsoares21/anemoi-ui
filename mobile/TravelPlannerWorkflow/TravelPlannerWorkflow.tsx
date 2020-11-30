import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import MultiCitySelector from '../shared/MultiCitySelector/MultiCitySelector';
import CitySelectionWorkflow from './CitySelectionWorkflow/CitySelectionWorkflow';
import { WorkflowSection } from './TravelPlanneWorkflow.d';
import WorkflowStep from './WorkflowStep/WorkflowStep';

interface TravelPlannerWorkflowProps {
  launchWorkflow: boolean;
}

const TravelPlannerWorkflow: React.FC<TravelPlannerWorkflowProps> = props => {
  const [workflowSection, updateWorkflowSection] = useState(
    WorkflowSection.Beginning
  );

  useEffect(() => {
    if (!props.launchWorkflow) return;
    let timeOutToClear: ReturnType<typeof setTimeout>;
    switch (workflowSection) {
      // defines the side effects for each workflow step
      case WorkflowSection.Beginning:
        timeOutToClear = setTimeout(
          () => updateWorkflowSection(WorkflowSection.CitySelection),
          300
        );
        break;
      /*case WorkflowSection.StayPeriodIntroduction:
        timeOutToClear = setTimeout(() => updateWorkflowSection(WorkflowSection.StayPeriod), 300);
        break;
      case WorkflowSection.CalculateTravelPlan:
        submitButtonRef.current.focus();
        break;*/
      default:
        break;
    }
    let cleanUpFunction = () => clearTimeout(timeOutToClear);
    return cleanUpFunction;
  }, [workflowSection, props.launchWorkflow]);

  return (
    <View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#6c757d'
  }
});

export default TravelPlannerWorkflow;
