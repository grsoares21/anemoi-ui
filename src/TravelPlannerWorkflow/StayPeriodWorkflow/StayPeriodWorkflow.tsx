import 'react-input-range/lib/css/index.css';
import './StayPeriodWorkflow.scss';

import { City } from '../../Services/LocationServices';
import WorkflowStep from '../WorkFlowStep/WorkflowStep';

import InputRange, { Range } from 'react-input-range';

import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

interface StayPeriodWorkflowProps {
  isVisible: boolean;
  cities: City[];
  onSubmit: (stayPeriods: CityToStayPeriodMapping) => void;
}

interface CityToStayPeriodMapping {
  [cityId: string]: [string, number, number]
}

const StayPeriodWorkflow: React.FC<StayPeriodWorkflowProps> = props => {
  let [stayPeriods, setStayPeriods] = useState<CityToStayPeriodMapping>({});

  useEffect(() => {
    var initialPeriods = props.cities.reduce<CityToStayPeriodMapping>((mappings, currCity) => {
      mappings[currCity.id] = [currCity.name, 3, 5];
      return mappings;
    }, {});
    setStayPeriods(initialPeriods);
  }, [props.cities]);

  return (
    <WorkflowStep isVisible={props.isVisible} uniqueKey="stayPeriodSelection" isFocused>
      <form>
      {
        Object.entries(stayPeriods).map(([cityId, [cityName, minDays, maxDays]]) => (
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
                setStayPeriods({...stayPeriods, [cityId]: [cityName, range.min, range.max]})
                }} />
            <br />
          </span>
        ))
      }
      </form>
      <br />
      <Button onClick={() => props.onSubmit(stayPeriods)} block size="lg">
        <b>Criar Plano de Viagem</b>
      </Button>
    </WorkflowStep>
  );
}

export default StayPeriodWorkflow;