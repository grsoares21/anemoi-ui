import { City } from '../Services/LocationServices';
import WorkflowStep from './WorkFlowStep/WorkflowStep';

import React, { useState } from 'react';

interface StayPeriodWorkflowProps {
  isVisible: boolean;
  cities: City[];
  onComplete: (stayPeriods: CityToStayPeriodMapping) => void;
}

interface CityToStayPeriodMapping {
  [cityName: string]: [number, number]
}

const StayPeriodWorkflow: React.FC<StayPeriodWorkflowProps> = props => {
  let initialValues = props.cities.reduce<CityToStayPeriodMapping>((mappings, currCity) => {
    mappings[currCity.name] = [3, 5];
    return mappings;
  }, {});

  let [stayPeriods, setStayPeriods] = useState<CityToStayPeriodMapping>(initialValues);

  return (
    <WorkflowStep isVisible={props.isVisible} uniqueKey="stayPeriodSelection" isFocused>
      {props.cities.map(city => (
        <span key={city.name}>
          <h4>
            Eu gostaria de ficar em {city.name} entre {stayPeriods[city.name][0]} e {stayPeriods[city.name][1]} dias.
          </h4>
        </span>
      ))}
    </WorkflowStep>
  );
}

export default StayPeriodWorkflow;
