import './TravelPlanResult.scss';

import React from 'react';
import { Route } from '../../Services/AnemoiServices/TravelPlanResult';

interface AirplaneRouteResultProps {
  route: Route;
}

const AirPlaneRouteResult: React.FC<AirplaneRouteResultProps> = props => {
  return (
    <div>
      {props.route.source} -> {props.route.destination}
    </div>
  );
}

export default AirPlaneRouteResult;