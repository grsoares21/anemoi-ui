import 'react-input-range/lib/css/index.css';
import './StayPeriodWorkflow.scss';

import { CityStayPeriod } from '../TravelPlannerWorkflow.d';

import InputRange, { Range } from 'react-input-range';

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

interface StayPeriodWorkflowProps {
  cityStayPeriods: CityStayPeriod[];
  onChange: (cityStayPeriods: CityStayPeriod[]) => void;
  onComplete: () => void;
}

const StayPeriodWorkflow: React.FC<StayPeriodWorkflowProps> = props => {
  const confirmButtonRef = useRef<any>(null);

  const { t } = useTranslation();
  useEffect(() => confirmButtonRef.current.focus(), []);

  return (
    <div>
      <form>
        {props.cityStayPeriods.map(({ city, minDays, maxDays }) => (
          <span key={city.id}>
            <h4>
              <em>{t('ID_LIKE_TO_STAY_IN_CITY_BETWEEN_X_AND_Y_DAYS', { city: city.name, x: minDays, y: maxDays })}</em>
            </h4>
            <br />
            <InputRange
              minValue={1}
              maxValue={30}
              value={{ min: minDays, max: maxDays }}
              onChange={value => {
                var range = value as Range;
                props.onChange(
                  props.cityStayPeriods.map(cityPeriod =>
                    cityPeriod.city.id === city.id ? { city: city, minDays: range.min, maxDays: range.max } : cityPeriod
                  )
                );
              }}
            />
            <br />
          </span>
        ))}
      </form>
      <br />
      <Button ref={confirmButtonRef} onClick={props.onComplete} size="lg" className="float-right">
        <b>↵</b>
      </Button>
    </div>
  );
};

export default StayPeriodWorkflow;
