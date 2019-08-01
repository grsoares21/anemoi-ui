import './TravelPlannerWorkflow.scss';

import {City} from '../Services/LocationServices';
import MultiCitySelector from '../Shared/MultiCitySelector';

import React, { useState } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import WorkflowStep from './WorkFlowStep/WorkflowStep';

interface TravelPlannerWorkflowProps {
  launchWorkflow: boolean
}

const TravelPlannerWorkflow: React.FC<TravelPlannerWorkflowProps> = props => {
  let [workflowStep, setWorkflowStep] = useState(0);
  let [departureCities, setDepartureCities] = useState<City[]>([]);
  let [visitingCities, setVisitingCities] = useState<City[]>([]);
  let [arrivalCities, setArrivalCities] = useState<City[]>([]);

  let updateWorkflowStep = (step: number) => setWorkflowStep(Math.max(step, workflowStep));
  // to prevent coming backwards on the steps when re-executing animation end callback

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
          <WorkflowStep isVisible={workflowStep >= 1} uniqueKey="departureCities" isFocused>
            <h4>Primeiramente, eu gostaria de saber quais cidades poderiam ser seu ponto de partida.</h4>
            <div className="SelectorStep">
              <MultiCitySelector
                  placeholder="Cidades de partida..."
                  onChange={(cities) => {setDepartureCities(cities)}}
                  onConfirm={() => updateWorkflowStep(2)} />
              <Button size="lg" onClick={() => departureCities.length > 0 && updateWorkflowStep(2)}>
                <b>↵</b>
              </Button>
            </div>
          </WorkflowStep>
          <WorkflowStep isVisible={workflowStep >= 2} uniqueKey="arrivalCities" isFocused>
            <h4>Ótimo! E quais cidades poderiam ser seu ponto de chegada?</h4>
            <div className="SelectorStep">
              <MultiCitySelector
                  placeholder="Cidades de chegada..."
                  onChange={(cities) => {setArrivalCities(cities)}}
                  onConfirm={() => updateWorkflowStep(3)} />
              <Button size="lg" onClick={() => arrivalCities.length > 0 && updateWorkflowStep(3)}>
                <b>↵</b>
              </Button>
            </div>
          </WorkflowStep>
          <WorkflowStep isVisible={workflowStep >= 3} uniqueKey="arrivalCities" isFocused>
            <h4>Perfeito! E, finalmente, quais cidades você gostaria de visitar?</h4>
            <div className="SelectorStep">
              <MultiCitySelector
                placeholder="Cidades para visitar..."
                onChange={(cities) => {setVisitingCities(cities)}}
                onConfirm={() => {
                  console.log(departureCities, arrivalCities, visitingCities);
                  // TODO: continue workflow
                }} />
              <Button size="lg" onClick={() => console.log(departureCities, arrivalCities, visitingCities)}>
                <b>↵</b>
              </Button>
            </div>
          </WorkflowStep>
        </Col>
      </Row>
    </Container>
  );
}

export default TravelPlannerWorkflow;
