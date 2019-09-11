import './RouteResult.scss'

import React from 'react';
import { Route } from '../../../Services/AnemoiServices/TravelPlanResult';
import { Row, Col } from 'react-bootstrap';

interface RouteResultProps {
  route: Route;
}

const RouteResult: React.FC<RouteResultProps> = props => {
  return (
    <Row className="RouteResult">
      <Col xs={3} className="RouteCity">{props.route.source}</Col>
      <Col xs={6} className="RouteSign">-></Col>
      <Col xs={3} className="RouteCity">{props.route.destination}</Col>
    </Row>
  );
}

export default RouteResult;