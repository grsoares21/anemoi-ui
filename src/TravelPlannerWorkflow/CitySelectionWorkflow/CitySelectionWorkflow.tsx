import './CitySelectionWorkflow.scss';

import { City } from '../../Services/LocationServices';
import MultiCitySelector from '../../Shared/MultiCitySelector';

import React, { useRef, useEffect, useState, ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

interface CitySelectionWorkflowProps {
  onSetDepartureCities: (cities: City[]) => void;
  onSetArrivalCities: (cities: City[]) => void;
  onClearVisitingCities: () => void;
  onAddVisitingCity: (city: City) => void;
  onRemoveVisitingCity: (city: City) => void;
  onComplete: () => void;
  departureCities: City[];
  visitingCities: City[];
  arrivalCities: City[];
}

const CitySelectionWorkflow: React.FC<CitySelectionWorkflowProps> = React.memo((props) => {
  let departuresSelectRef = useRef<any>(null);
  let visitingSelectRef = useRef<any>(null);
  let arrivalsSelectRef = useRef<any>(null);

  let [sameDepartureArrival, setSameDepartureArrival] = useState(true);

  useEffect(() => {departuresSelectRef.current.focus()}, []);

  const { t } = useTranslation()

  return (
    <span>
      <h4>
        <em>
          {t('WHAT_ARE_THE_DEPARTURE_AND_ARRIVAL_POINTS')}
        </em>
      </h4>
      <label>{t('POSSIBLE_DEPARTURE_POINTS')}</label>
      <MultiCitySelector
        invalid={props.departureCities.length === 0}
        invalidMessage={t('PLEASE_SELECT_DEPARTURE_CITIES')}
        inputRef={departuresSelectRef}
        placeholder={t('DEPARTURE_CITIES')}
        invalidCities={props.visitingCities}
        value={props.departureCities}
        onChange={cities => {
          props.onSetDepartureCities(cities);
          sameDepartureArrival && props.onSetArrivalCities(cities);
        }}
        onConfirm={() => sameDepartureArrival ?
          visitingSelectRef.current.focus() :
          arrivalsSelectRef.current.focus()
        } />
      <br />
      <label>{t('POSSIBLE_ARRIVAL_POINTS')}</label>
      <MultiCitySelector
        invalid={props.arrivalCities.length === 0 && !sameDepartureArrival}
        invalidMessage={t('PLEASE_SELECT_ARRIVAL_CITIES')}
        disabled={sameDepartureArrival}
        inputRef={arrivalsSelectRef}
        placeholder={t('ARRIVAL_CITIES')}
        invalidCities={props.visitingCities}
        value={sameDepartureArrival ? [] : props.arrivalCities}
        onChange={cities => props.onSetArrivalCities(cities)}
        onConfirm={() => visitingSelectRef.current.focus()} />
      <Form.Check
        custom
        type="checkbox"
        className={sameDepartureArrival ? 'custom-checkbox-checked' : ''}
        checked={sameDepartureArrival}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          e.target.checked ?
            props.onSetArrivalCities(props.departureCities) :
            props.onSetArrivalCities([]);
          setSameDepartureArrival(e.target.checked)
        }}
        label={t('USE_SAME_DEPARTURE_AND_ARRIVAL_POINTS')}
        id="same-departure-arrival-checkbox" />
      <br />
      <label>{t('CITIES_TO_VISIT')}:</label>
      <MultiCitySelector
        invalid={props.visitingCities.length === 0}
        invalidMessage={t('PLEASE_SELECT_VISITING_CITIES')}
        inputRef={visitingSelectRef}
        placeholder={t('CITIES_TO_VISIT')}
        invalidCities={props.arrivalCities.concat(props.departureCities)}
        value={props.visitingCities}
        onAddCity={(city) => props.onAddVisitingCity(city)}
        onRemoveCity={(city) => props.onRemoveVisitingCity(city)}
        onClear={props.onClearVisitingCities}
        onConfirm={props.onComplete} />
      <br />
      <Button
        disabled={
          props.departureCities.length === 0 ||
          props.arrivalCities.length === 0 ||
          props.visitingCities.length === 0
        }
        className="float-right"
        size="lg"
        onClick={props.onComplete}>
        <b>↵</b>
      </Button>
    </span>
  );
}, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.arrivalCities) === JSON.stringify(nextProps.arrivalCities) &&
    JSON.stringify(prevProps.departureCities) === JSON.stringify(nextProps.departureCities) &&
    JSON.stringify(prevProps.visitingCities) === JSON.stringify(nextProps.visitingCities);
});

export default CitySelectionWorkflow;
