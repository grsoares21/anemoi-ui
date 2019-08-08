import 'react-input-range/lib/css/index.css';
import './StayPeriodWorkflow.scss';

import { City } from '../../Services/LocationServices';
import WorkflowStep from '../WorkFlowStep/WorkflowStep';

import InputRange, { Range } from 'react-input-range';

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
      <form>
      {props.cities.map(city => (
        <span key={city.name}>
          <h4>
            Eu gostaria de ficar em {city.name} entre {stayPeriods[city.name][0]} e {stayPeriods[city.name][1]} dias.
          </h4>
          <br />
          <InputRange
            minValue={1}
            maxValue={30}
            value={{min: stayPeriods[city.name][0], max: stayPeriods[city.name][1]}}
            onChange={value => {
              var range = value as Range;
              setStayPeriods({...stayPeriods, [city.name]: [range.min, range.max]})
              }} />
        </span>
      ))}
      </form>
    </WorkflowStep>
  );
}

export default StayPeriodWorkflow;
