import './TravelPlannerWorkflow.scss'

import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

interface TravelPlannerWorkflowProps {
  launchWorkflow: boolean
}

const TravelPlannerWorkflow: React.FC<TravelPlannerWorkflowProps> = props => {
  let [worfklowStep, setWorkflowStep] = useState(0);
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
                <h4>Eu posso lhe dizer a ordem mais barata para visitar as cidades que você deseja.</h4>
              </CSSTransition>
            }
            {worfklowStep >= 2 &&
              <CSSTransition {...stepsAnimProps} onEntered={incrementWorkflowStep}>
                <h4 className="FocusedStep">Para onde você gostaria de ir?</h4>
              </CSSTransition>
            }
          </TransitionGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default TravelPlannerWorkflow;
