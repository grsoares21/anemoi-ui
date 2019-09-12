import './RouteResult.scss'

import React from 'react';
import { Route } from '../../../Services/AnemoiServices/TravelPlanResult';
import { Row, Col } from 'react-bootstrap';
import FlagIcon from '../../../Shared/FlagIcon';

interface RouteResultProps {
  route: Route;
}

const RouteResult: React.FC<RouteResultProps> = props => {
  let locale = 'pt-BR';
  let dateStringOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  };

  return (
    <Row className="RouteResult">
      <Col xs={5} className="RouteCity">
        <FlagIcon className="FlagIcon" size="3x" squared code={props.route.source.countryCode.toLowerCase()} />
        <br />
        <span className="CityLabel">{props.route.source.cityName}, {props.route.source.countryName}</span>
        <br />
        <span className="DateLabel">{new Date(props.route.startTime).toLocaleDateString(locale, dateStringOptions)}</span>
      </Col>
      <Col xs={2} className="RouteSign">-></Col>
      <Col xs={5} className="RouteCity">
        <FlagIcon className="FlagIcon" size="3x" squared code={props.route.destination.countryCode.toLowerCase()} />
        <br />
        <span className="CityLabel">{props.route.destination.cityName}, {props.route.destination.countryName}</span>
        <br />
        <span className="DateLabel">{new Date(props.route.endTime).toLocaleDateString(locale, dateStringOptions)}</span>
      </Col>
    </Row>
  );
}

export default RouteResult;