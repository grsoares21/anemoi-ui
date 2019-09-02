import './CitySelectionWorkflow.scss';

import { City } from '../../Services/LocationServices';
import MultiCitySelector from '../../Shared/MultiCitySelector';

import React, { useRef, useEffect, useState, ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';

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

  return (
    <span>
      <h4>
        <em>
          Primeiramente, eu preciso saber quais são seus possíveis pontos de partida, chegada
          e quais cidades você deseja visitar.
        </em>
      </h4>
      <label>Possíveis pontos de partida:</label>
      <MultiCitySelector
        inputRef={departuresSelectRef}
        placeholder="Cidades de partida..."
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
      <label>Possíveis pontos de chegada:</label>
      <MultiCitySelector
        disabled={sameDepartureArrival}
        inputRef={arrivalsSelectRef}
        placeholder="Cidades de chegada..."
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
        label="Usar mesmos pontos de partida e chegada"
        id="same-departure-arrival-checkbox" />
      <br />
      <label>Cidades para visitar:</label>
      <MultiCitySelector
        inputRef={visitingSelectRef}
        placeholder="Cidades para visitar..."
        value={props.visitingCities}
        onAddCity={(city) => props.onAddVisitingCity(city)}
        onRemoveCity={(city) => props.onRemoveVisitingCity(city)}
        onClear={props.onClearVisitingCities}
        onConfirm={props.onComplete} />
      <br />
      <Button className="float-right" size="lg" onClick={props.onComplete}>
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
