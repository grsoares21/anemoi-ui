import { City } from '../Services/LocationServices';
import MultiCitySelector from '../Shared/MultiCitySelector';
import WorkflowStep from './WorkFlowStep/WorkflowStep';
import { SelectedCities } from './TravelPlannerWorkflow';

import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

interface CitySelectionWorkflowProps {
  workflowStep: number;
  setWorkflowStep: (step: number) => void;

  setSelectedCities: (selectedCities: SelectedCities) => void;
}

const CitySelectionWorkflow: React.FC<CitySelectionWorkflowProps> = props => {
  let [departureCities, setDepartureCities] = useState<City[]>([]);
  let [visitingCities, setVisitingCities] = useState<City[]>([]);
  let [arrivalCities, setArrivalCities] = useState<City[]>([]);

  return (
    <span>
      <WorkflowStep isVisible={props.workflowStep >= 1} uniqueKey="departureCities" isFocused>
        <h4>Primeiramente, eu gostaria de saber quais cidades poderiam ser seu ponto de partida.</h4>
        <div className="SelectorStep">
          <MultiCitySelector
              placeholder="Cidades de partida..."
              onChange={(cities) => {setDepartureCities(cities)}}
              onConfirm={() => props.setWorkflowStep(2)} />
          <Button size="lg" onClick={() => departureCities.length > 0 && props.setWorkflowStep(2)}>
            <b>↵</b>
          </Button>
        </div>
      </WorkflowStep>
      <WorkflowStep isVisible={props.workflowStep >= 2} uniqueKey="arrivalCities" isFocused>
        <h4>Ótimo! E quais cidades poderiam ser seu ponto de chegada?</h4>
        <div className="SelectorStep">
          <MultiCitySelector
              placeholder="Cidades de chegada..."
              onChange={(cities) => {setArrivalCities(cities)}}
              onConfirm={() => props.setWorkflowStep(3)} />
          <Button size="lg" onClick={() => arrivalCities.length > 0 && props.setWorkflowStep(3)}>
            <b>↵</b>
          </Button>
        </div>
      </WorkflowStep>
      <WorkflowStep isVisible={props.workflowStep >= 3} uniqueKey="arrivalCities" isFocused>
        <h4>Perfeito! E, finalmente, quais cidades você gostaria de visitar?</h4>
        <div className="SelectorStep">
          <MultiCitySelector
            placeholder="Cidades para visitar..."
            onChange={(cities) => {setVisitingCities(cities)}}
            onConfirm={() => props.setSelectedCities({
              arrivalCities: arrivalCities,
              visitingCities: visitingCities,
              departureCities: departureCities
            })} />
          <Button size="lg" onClick={() => props.setSelectedCities({
              arrivalCities: arrivalCities,
              visitingCities: visitingCities,
              departureCities: departureCities
            })}>
            <b>↵</b>
          </Button>
        </div>
      </WorkflowStep>
    </span>
  );
}

export default CitySelectionWorkflow;
