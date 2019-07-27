import './TravelPlannerWorkflow.scss'

import {City} from '../Services/LocationServices';
import MultiCitySelector from '../Shared/MultiCitySelector';

import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

interface TravelPlannerWorkflowProps {
  launchWorkflow: boolean
}

const TravelPlannerWorkflow: React.FC<TravelPlannerWorkflowProps> = props => {
  let [worfklowStep, setWorkflowStep] = useState(0);
  let [departureCities, setDepartureCities] = useState<City[]>([]);
  let [visitingCities, setVisitingCities] = useState<City[]>([]);
  let [arrivalCities, setArrivalCities] = useState<City[]>([]);
  let incrementWorkflowStep = () => setWorkflowStep(worfklowStep + 1);

  let stepsAnimProps = {
    appear: true,
    timeout: 300,
    classNames: "WorkflowStepsAnim"
  }

  return (
    <Container>
      <Row>
        <Col xs={{ span: 12 }} md={{ span: 8, offset: 2 }}>
          <br />
          <br />
          <br />
          <TransitionGroup className="WorkflowSteps">
            {props.launchWorkflow &&
              <CSSTransition {...stepsAnimProps} onEntered={incrementWorkflowStep}>
                <h4>Ótimo, então vamos lá!</h4>
              </CSSTransition>
            }
            {worfklowStep >= 1 &&
              <CSSTransition {...stepsAnimProps} timeout={400} onEntered={incrementWorkflowStep}>
                <div>
                  <h4 className="FocusedStep">Primeiramente, eu gostaria de saber quais cidades poderiam ser seu ponto de partida.</h4>
                  <MultiCitySelector
                    placeholder="Cidades de partida..."
                    onChange={(cities) => {setDepartureCities(cities)}}
                    />
                </div>
              </CSSTransition>
            }
            {worfklowStep >= 2 &&
              <CSSTransition {...stepsAnimProps} onEntered={incrementWorkflowStep}>
                <div>
                  <h4 className="FocusedStep">Ótimo! E quais cidades poderiam ser seu ponto de chegada?</h4>
                  <MultiCitySelector
                    placeholder="Cidades de chegada..."
                    onChange={(cities) => {setArrivalCities(cities)}}
                    />
                </div>
              </CSSTransition>
            }
            {worfklowStep >= 3 &&
              <CSSTransition {...stepsAnimProps} onEntered={incrementWorkflowStep}>
                <div>
                  <h4 className="FocusedStep">Perfeito! E, finalmente, quais cidades você gostaria de visitar?</h4>
                  <MultiCitySelector
                    placeholder="Cidades para visitar..."
                    onChange={(cities) => {setVisitingCities(cities)}}
                    />
                </div>
              </CSSTransition>
            }
          </TransitionGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default TravelPlannerWorkflow;
