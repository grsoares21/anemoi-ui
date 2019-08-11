import './TravelPlannerWorkflow.scss';

import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { animateScroll } from 'react-scroll';

import WorkflowStep from './WorkFlowStep/WorkflowStep';
import CitySelectionWorkflow, { SelectedCities } from './CitySelectionWorkflow';
import StayPeriodWorkflow from './StayPeriodWorkflow/StayPeriodWorkflow';

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
  let updateWorkflowStep = (step: number) => {
    if(step > workflowStep) {
      setWorkflowStep(step);
      animateScroll.scrollToBottom({containerId: "TravelPlannerWorkflow", isDynamic: true, duration: 500});
    }
  }
  // to prevent coming backwards on the steps when re-executing animations' end callback

  return (
    <div id="TravelPlannerWorkflow" style={{display: props.launchWorkflow ? 'block' : 'none'}}>
      <div className="FaderGradient"></div>
      <Container>
        <Row>
          <Col xs={{ span: 12 }} md={{ span: 8, offset: 2 }}>
            <br /><br /><br />
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
                uniqueKey="letsGo"
                onAnimationEnd={() => updateWorkflowStep(3)}>
              <h4>Soa como um bom plano!</h4>
              <h4>
                Para te ajudar a planejar ele, vou precisar saber por volta
                de quantos dias você deseja ficar em cada cidade:
              </h4>
            </WorkflowStep>
            <StayPeriodWorkflow
              isVisible={workflowStep >= 3}
              cities={selectedCities.visitingCities}
              onSubmit={(bla) => {console.log(bla)}} />
            <br /><br />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TravelPlannerWorkflow;
