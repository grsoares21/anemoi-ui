import './CitySelectionWorkflow.scss';

import MultiCitySelector from '../../Shared/MultiCitySelector/MultiCitySelector';

import React, { useRef, useEffect, useState, useContext, useMemo, ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { TravelPlannerWorkflowContext } from '../TravelPlannerWorkflow.context';

interface CitySelectionWorkflowProps {
  onComplete: () => void;
}

const CitySelectionWorkflow: React.FC<CitySelectionWorkflowProps> = props => {
  let departuresSelectRef = useRef<any>(null);
  let visitingSelectRef = useRef<any>(null);
  let arrivalsSelectRef = useRef<any>(null);

  let [sameDepartureArrival, setSameDepartureArrival] = useState(true);

  const { state, dispatch } = useContext(TravelPlannerWorkflowContext);

  useEffect(() => {
    departuresSelectRef.current.focus();
  }, []);

  const { t } = useTranslation();
  const visitingCities = state.visitingCities.map(vc => vc.city);

  return useMemo(
    () => (
      <span>
        <h4>
          <em>{t('WHAT_ARE_THE_DEPARTURE_AND_ARRIVAL_POINTS')}</em>
        </h4>
        <label>{t('POSSIBLE_DEPARTURE_POINTS')}</label>
        <MultiCitySelector
          invalid={state.departureCities.length === 0}
          invalidMessage={t('PLEASE_SELECT_DEPARTURE_CITIES')}
          inputRef={departuresSelectRef}
          placeholder={t('DEPARTURE_CITIES')}
          invalidCities={visitingCities}
          value={state.departureCities}
          onChange={cities => {
            dispatch({ type: 'setDepartureCities', cities: cities });
            sameDepartureArrival && dispatch({ type: 'setArrivalCities', cities: cities });
          }}
          onConfirm={() =>
            sameDepartureArrival ? visitingSelectRef.current.focus() : arrivalsSelectRef.current.focus()
          }
        />
        <br />
        <label>{t('CITIES_TO_VISIT')}:</label>
        <MultiCitySelector
          invalid={state.visitingCities.length === 0}
          invalidMessage={t('PLEASE_SELECT_VISITING_CITIES')}
          inputRef={visitingSelectRef}
          placeholder={t('CITIES_TO_VISIT')}
          invalidCities={state.arrivalCities.concat(state.departureCities)}
          value={visitingCities}
          onAddCity={city =>
            dispatch({
              type: 'setVisitingCities',
              cities: [...state.visitingCities, { city: city, minDays: 3, maxDays: 5 }]
            })
          }
          onRemoveCity={city =>
            dispatch({
              type: 'setVisitingCities',
              cities: state.visitingCities.filter(cityPeriod => cityPeriod.city.id !== city.id)
            })
          }
          onClear={() => dispatch({ type: 'setVisitingCities', cities: [] })}
          onConfirm={props.onComplete}
        />
        <br />
        <label>{t('POSSIBLE_ARRIVAL_POINTS')}</label>
        <MultiCitySelector
          invalid={state.arrivalCities.length === 0 && !sameDepartureArrival}
          invalidMessage={t('PLEASE_SELECT_ARRIVAL_CITIES')}
          disabled={sameDepartureArrival}
          inputRef={arrivalsSelectRef}
          placeholder={t('ARRIVAL_CITIES')}
          invalidCities={visitingCities}
          value={sameDepartureArrival ? [] : state.arrivalCities}
          onChange={cities => dispatch({ type: 'setArrivalCities', cities: cities })}
          onConfirm={() => visitingSelectRef.current.focus()}
        />
        <Form.Check
          custom
          type="checkbox"
          className={sameDepartureArrival ? 'custom-checkbox-checked' : ''}
          checked={sameDepartureArrival}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            e.target.checked
              ? dispatch({ type: 'setArrivalCities', cities: state.departureCities })
              : dispatch({ type: 'setArrivalCities', cities: [] });
            setSameDepartureArrival(e.target.checked);
          }}
          label={t('USE_SAME_DEPARTURE_AND_ARRIVAL_POINTS')}
          id="different-departure-arrival-checkbox"
        />
        <br />
        <Button
          disabled={
            state.departureCities.length === 0 || state.arrivalCities.length === 0 || state.visitingCities.length === 0
          }
          className="float-right"
          size="lg"
          onClick={props.onComplete}
        >
          <b>↵</b>
        </Button>
      </span>
    ),
    [
      dispatch,
      props.onComplete,
      sameDepartureArrival,
      state.arrivalCities,
      state.departureCities,
      state.visitingCities,
      t,
      visitingCities
    ]
  );
};

export default CitySelectionWorkflow;
