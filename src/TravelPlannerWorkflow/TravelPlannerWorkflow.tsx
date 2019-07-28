import './TravelPlannerWorkflow.scss'

import {City} from '../Services/LocationServices';
import MultiCitySelector from '../Shared/MultiCitySelector';

import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import posed, { PoseGroup } from 'react-pose';

interface TravelPlannerWorkflowProps {
  launchWorkflow: boolean
}

const WorkflowStepAnimation = posed.div({
  exit: { opacity: 0, marginTop: '-10px' },
  enter: {
    opacity: 1,
    marginTop: '0px',
    transition: { ease: 'easeOut', duration: 300 }
  }
})

const TravelPlannerWorkflow: React.FC<TravelPlannerWorkflowProps> = props => {
  let [worfklowStep, setWorkflowStep] = useState(0);
  let [departureCities, setDepartureCities] = useState<City[]>([]);
  let [visitingCities, setVisitingCities] = useState<City[]>([]);
  let [arrivalCities, setArrivalCities] = useState<City[]>([]);
  let incrementWorkflowStep = () => setWorkflowStep(worfklowStep + 1);

  return (
    <Container>
      <Row>
        <Col xs={{ span: 12 }} md={{ span: 8, offset: 2 }}>
          <br />
          <br />
          <br />
          <PoseGroup className="WorkflowSteps">
            {props.launchWorkflow &&
              <WorkflowStepAnimation key="letsGo" onPoseComplete={incrementWorkflowStep}>
                <h4>Ótimo, então vamos lá!</h4>
              </WorkflowStepAnimation>
            }
            {worfklowStep >= 1 &&
              <WorkflowStepAnimation key="departureCities" onPoseComplete={incrementWorkflowStep}>
                <h4 className="FocusedStep">Primeiramente, eu gostaria de saber quais cidades poderiam ser seu ponto de partida.</h4>
                <MultiCitySelector
                  placeholder="Cidades de partida..."
                  onChange={(cities) => {setDepartureCities(cities)}}
                  />
              </WorkflowStepAnimation>
            }
            {worfklowStep >= 2 &&
              <WorkflowStepAnimation key="arrivalCities" onPoseComplete={incrementWorkflowStep}>
                <h4 className="FocusedStep">Ótimo! E quais cidades poderiam ser seu ponto de chegada?</h4>
                <MultiCitySelector
                  placeholder="Cidades de chegada..."
                  onChange={(cities) => {setArrivalCities(cities)}}
                  />
              </WorkflowStepAnimation>
            }
            {worfklowStep >= 3 &&
              <WorkflowStepAnimation key="visitingCities" onPoseComplete={incrementWorkflowStep}>
                <h4 className="FocusedStep">Perfeito! E, finalmente, quais cidades você gostaria de visitar?</h4>
                <MultiCitySelector
                  placeholder="Cidades para visitar..."
                  onChange={(cities) => {setVisitingCities(cities)}}
                  />
              </WorkflowStepAnimation>
            }
          </PoseGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default TravelPlannerWorkflow;
