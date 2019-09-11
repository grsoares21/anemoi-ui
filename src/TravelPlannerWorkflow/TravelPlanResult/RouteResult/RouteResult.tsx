import './RouteResult.scss'

import React from 'react';
import { Route } from '../../../Services/AnemoiServices/TravelPlanResult';
import { Row, Col } from 'react-bootstrap';
import FlagIcon from '../../../Shared/FlagIcon';

interface RouteResultProps {
  route: Route;
}

const RouteResult: React.FC<RouteResultProps> = props => {
  return (
    <Row className="RouteResult">
      <Col xs={4} className="RouteCity">
        <FlagIcon size="3x" squared code={props.route.source.countryCode.toLowerCase()} />
        <br />
        {props.route.source.cityName}, {props.route.source.countryName}
      </Col>
      <Col xs={4} className="RouteSign">-></Col>
      <Col xs={4} className="RouteCity">
        <FlagIcon size="3x" squared code={props.route.destination.countryCode.toLowerCase()} />
        <br />
        {props.route.destination.cityName}, {props.route.destination.countryName}
      </Col>
    </Row>
  );
}

export default RouteResult;