import { City } from '../Services/LocationServices';
import MultiCitySelector from '../Shared/MultiCitySelector';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';

export interface SelectedCities {
  departureCities: City[];
  visitingCities: City[];
  arrivalCities: City[];
}

interface CitySelectionWorkflowProps {
  onComplete: (selectedCities: SelectedCities) => void;
}

const CitySelectionWorkflow: React.FC<CitySelectionWorkflowProps> = props => {
  let [departureCities, setDepartureCities] = useState<City[]>([]);
  let [visitingCities, setVisitingCities] = useState<City[]>([]);
  let [arrivalCities, setArrivalCities] = useState<City[]>([]);

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
        onChange={(cities) => {setDepartureCities(cities)}}
        onConfirm={() => arrivalsSelectRef.current.focus()} />
      <br />
      <label>Possíveis pontos de chegada:</label>
      <MultiCitySelector
        inputRef={arrivalsSelectRef}
        placeholder="Cidades de chegada..."
        onChange={(cities) => {setArrivalCities(cities)}}
        onConfirm={() => visitingSelectRef.current.focus()} />
      <br />
      <label>Cidades para visitar:</label>
      <MultiCitySelector
        inputRef={visitingSelectRef}
        placeholder="Cidades para visitar..."
        onChange={(cities) => {setVisitingCities(cities)}}
        onConfirm={() => props.onComplete({
          arrivalCities: arrivalCities,
          visitingCities: visitingCities,
          departureCities: departureCities
        })} />
      <br />
      <Button className="float-right" size="lg" onClick={() => props.onComplete({
          arrivalCities: arrivalCities,
          visitingCities: visitingCities,
          departureCities: departureCities
        })}>
        <b>↵</b>
      </Button>
    </span>
  );
}

export default CitySelectionWorkflow;
