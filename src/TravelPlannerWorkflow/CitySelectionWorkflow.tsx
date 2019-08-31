import { City } from '../Services/LocationServices';
import MultiCitySelector from '../Shared/MultiCitySelector';

import React, { useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';

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
        onChange={(cities) => {props.onSetDepartureCities(cities)}}
        onConfirm={() => arrivalsSelectRef.current.focus()} />
      <br />
      <label>Possíveis pontos de chegada:</label>
      <MultiCitySelector
        inputRef={arrivalsSelectRef}
        placeholder="Cidades de chegada..."
        onChange={(cities) => {props.onSetArrivalCities(cities)}}
        onConfirm={() => visitingSelectRef.current.focus()} />
      <br />
      <label>Cidades para visitar:</label>
      <MultiCitySelector
        inputRef={visitingSelectRef}
        placeholder="Cidades para visitar..."
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
