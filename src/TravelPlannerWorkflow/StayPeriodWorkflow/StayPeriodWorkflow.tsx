import 'react-input-range/lib/css/index.css';
import './StayPeriodWorkflow.scss';

import { City } from '../../Services/LocationServices';
import WorkflowStep from '../WorkFlowStep/WorkflowStep';

import InputRange, { Range } from 'react-input-range';

import React, { useState, useEffect } from 'react';

interface StayPeriodWorkflowProps {
  isVisible: boolean;
  cities: City[];
  onComplete: (stayPeriods: CityToStayPeriodMapping) => void;
}

interface CityToStayPeriodMapping {
  [cityName: string]: [number, number]
}

const StayPeriodWorkflow: React.FC<StayPeriodWorkflowProps> = props => {
  let [stayPeriods, setStayPeriods] = useState<CityToStayPeriodMapping>({});

  useEffect(() => {
    var initialPeriods = props.cities.reduce<CityToStayPeriodMapping>((mappings, currCity) => {
      mappings[currCity.name] = [3, 5];
      return mappings;
    }, {});
    setStayPeriods(initialPeriods);
  }, [props.cities]);

  return (
    <WorkflowStep isVisible={props.isVisible} uniqueKey="stayPeriodSelection" isFocused>
      <form>
      {
        Object.entries(stayPeriods).map(([cityName, [minDays, maxDays]]) => (
          <span key={cityName}>
            <h4>
              Eu gostaria de ficar em {cityName} entre {minDays} e {maxDays} dias.
            </h4>
            <br />
            <InputRange
              minValue={1}
              maxValue={30}
              value={{min: minDays, max: maxDays}}
              onChange={value => {
                var range = value as Range;
                setStayPeriods({...stayPeriods, [cityName]: [range.min, range.max]})
                }} />
          </span>
        ))
      }
      </form>
    </WorkflowStep>
  );
}

export default StayPeriodWorkflow;