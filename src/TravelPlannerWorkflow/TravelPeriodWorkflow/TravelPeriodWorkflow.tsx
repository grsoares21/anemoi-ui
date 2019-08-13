import './TravelPeriodWorkflow.scss';

import React, { useState } from 'react';

import WorkflowStep from '../WorkflowStep/WorkflowStep';

import { Row, Col } from 'react-bootstrap';

interface TravelPlanResultProps {
  isVisible: boolean;
}

const TravelPlanResult: React.FC<TravelPlanResultProps> = props => {
  return (
    <WorkflowStep isVisible={props.isVisible} uniqueKey="travelPeriodWorkflow" isFocused>
      <h4>Para quando você está planejando esta viagem?</h4>
      <Row>
        <Col xs={6}>

        </Col>
        <Col xs={6}>
        </Col>
      </Row>
    </WorkflowStep>
  );
}

export default TravelPlanResult;