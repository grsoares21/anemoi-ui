import {City} from '../Services/LocationServices';
import MultiCitySelector from '../Shared/MultiCitySelector';

import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import WorkflowStep from './WorkFlowStep/WorkflowStep';

interface TravelPlannerWorkflowProps {
  launchWorkflow: boolean
}

const TravelPlannerWorkflow: React.FC<TravelPlannerWorkflowProps> = props => {
  let [worfklowStep, setWorkflowStep] = useState(0);
  let [departureCities, setDepartureCities] = useState<City[]>([]);
  let [visitingCities, setVisitingCities] = useState<City[]>([]);
  let [arrivalCities, setArrivalCities] = useState<City[]>([]);

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
              onAnimationEnd={() => setWorkflowStep(1)}>
            <h4>Ótimo, então vamos lá!</h4>
          </WorkflowStep>
          <WorkflowStep isVisible={worfklowStep >= 1} uniqueKey="departureCities" isFocused>
            <h4>Primeiramente, eu gostaria de saber quais cidades poderiam ser seu ponto de partida.</h4>
            <MultiCitySelector
                placeholder="Cidades de partida..."
                onChange={(cities) => {setDepartureCities(cities)}} />
          </WorkflowStep>
          <WorkflowStep isVisible={worfklowStep >= 2} uniqueKey="arrivalCities" isFocused>
            <h4>Ótimo! E quais cidades poderiam ser seu ponto de chegada?</h4>
            <MultiCitySelector
                placeholder="Cidades de chegada..."
                onChange={(cities) => {setArrivalCities(cities)}} />
          </WorkflowStep>
          <WorkflowStep isVisible={worfklowStep >= 3} uniqueKey="arrivalCities" isFocused>
            <h4>Perfeito! E, finalmente, quais cidades você gostaria de visitar?</h4>
            <MultiCitySelector
              placeholder="Cidades para visitar..."
              onChange={(cities) => {setVisitingCities(cities)}}
              />
          </WorkflowStep>
        </Col>
      </Row>
    </Container>
  );
}

export default TravelPlannerWorkflow;
