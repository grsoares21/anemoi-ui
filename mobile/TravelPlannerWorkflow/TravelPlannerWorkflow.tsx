import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import Button from '../shared/Button/Button';
import CitySelectionWorkflow from './CitySelectionWorkflow/CitySelectionWorkflow';
import StayPeriodWorkflow from './StayPeriodWorfklow/StayPeriodWorkflow';
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
      case WorkflowSection.StayPeriodIntroduction:
        timeOutToClear = setTimeout(
          () => updateWorkflowSection(WorkflowSection.StayPeriod),
          300
        );
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
      <Button
        onPress={() => {
          updateWorkflowSection(WorkflowSection.StayPeriodIntroduction);
        }}
      >
        Next
      </Button>
      {workflowSection >= WorkflowSection.StayPeriodIntroduction && (
        <WorkflowStep>
          <Text style={styles.title}>
            Soa como um bom plano! Para te ajudar a planejar ele, vou precisar
            saber por volta de quantos dias você deseja ficar em cada cidade:
          </Text>
        </WorkflowStep>
      )}
      {workflowSection >= WorkflowSection.StayPeriod && (
        <WorkflowStep>
          <StayPeriodWorkflow cities={['Porto Alegre', 'Amsterdã']} />
        </WorkflowStep>
      )}
    </ScrollView>
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
