import './TravelPlannerWorkflow.scss';

import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import WorkflowStep from './WorkFlowStep/WorkflowStep';
import CitySelectionWorkflow, { SelectedCities } from './CitySelectionWorkflow';

interface TravelPlannerWorkflowProps {
  launchWorkflow: boolean
}

const TravelPlannerWorkflow: React.FC<TravelPlannerWorkflowProps> = props => {
  let [selectedCities, setSelectedCities] = useState<SelectedCities>({
    departureCities: [],
    visitingCities: [],
    arrivalCities: []
  });

  let [workflowStep, setWorkflowStep] = useState(0);
  let updateWorkflowStep = (step: number) => setWorkflowStep(Math.max(step, workflowStep));
  // to prevent coming backwards on the steps when re-executing animations' end callback

  return (
    <Container>
      <Row>
        <Col xs={{ span: 12 }} md={{ span: 8, offset: 2 }}>
          <br />
          <br />
          <br />
          <WorkflowStep
              isVisible={props.launchWorkflow}
              uniqueKey="letsGo"
              onAnimationEnd={() => updateWorkflowStep(1)}>
            <h4>Ótimo, então vamos lá!</h4>
          </WorkflowStep>
          <CitySelectionWorkflow
            isVisible={workflowStep >= 1}
            onComplete={(cities) => {setSelectedCities(cities); updateWorkflowStep(2)}} />
          <br />
          <WorkflowStep
              isVisible={workflowStep >= 2}
              uniqueKey="letsGo">
            <h4>Soa como um bom plano!</h4>
            <h4>
              Para te ajudar a planejar ele, vou precisar saber por volta
               de quantos dias você deseja ficar em cada cidade:
            </h4>
          </WorkflowStep>
        </Col>
      </Row>
    </Container>
  );
}

export default TravelPlannerWorkflow;
