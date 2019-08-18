import 'react-input-range/lib/css/index.css';
import './StayPeriodWorkflow.scss';

import { City } from '../../Services/LocationServices';
import WorkflowStep from '../WorkflowStep/WorkflowStep';

import InputRange, { Range } from 'react-input-range';

import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

interface StayPeriodWorkflowProps {
  isVisible: boolean;
  cities: City[];
  onSubmit: (stayPeriods: CityToStayPeriodMapping) => void;
}

interface CityStayPeriod {
  cityName: string;
  minDays: number;
  maxDays: number;
}

export interface CityToStayPeriodMapping {
  [cityId: string]: CityStayPeriod
}

const StayPeriodWorkflow: React.FC<StayPeriodWorkflowProps> = props => {
  let [stayPeriods, setStayPeriods] = useState<CityToStayPeriodMapping>({});

  useEffect(() => {
    var initialPeriods = props.cities.reduce<CityToStayPeriodMapping>((mappings, currCity) => {
      mappings[currCity.id] = {cityName: currCity.name, minDays: 3, maxDays: 5};
      return mappings;
    }, {});
    setStayPeriods(initialPeriods);
  }, [props.cities]);

  return (
    <WorkflowStep isVisible={props.isVisible} uniqueKey="stayPeriodSelection" isFocused>
      <form>
      {
        Object.entries(stayPeriods).map(([cityId, {cityName, minDays, maxDays}]) => (
          <span key={cityId}>
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
                setStayPeriods({...stayPeriods, [cityId]: {cityName, minDays: range.min, maxDays: range.max}})
              }} />
            <br />
          </span>
        ))
      }
      </form>
      <br />
      <Button onClick={() => props.onSubmit(stayPeriods)} size="lg" className="float-right">
        <b>↵</b>
      </Button>
    </WorkflowStep>
  );
}

export default StayPeriodWorkflow;