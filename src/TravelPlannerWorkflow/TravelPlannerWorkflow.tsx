import './TravelPlannerWorkflow.scss';

import {City} from '../Services/LocationServices';

import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import WorkflowStep from './WorkFlowStep/WorkflowStep';
import CitySelectionWorkflow from './CitySelectionWorkflow';

export interface SelectedCities {
  departureCities: City[];
  visitingCities: City[];
  arrivalCities: City[];
}
interface TravelPlannerWorkflowProps {
  launchWorkflow: boolean
}

const TravelPlannerWorkflow: React.FC<TravelPlannerWorkflowProps> = props => {
  let [workflowStep, setWorkflowStep] = useState(0);
  let [selectedCities, setSelectedCities] = useState<SelectedCities>({
    departureCities: [],
    visitingCities: [],
    arrivalCities: []
  });

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
            setSelectedCities={setSelectedCities}
            setWorkflowStep={updateWorkflowStep}
            workflowStep={workflowStep} />
        </Col>
      </Row>
    </Container>
  );
}

export default TravelPlannerWorkflow;
