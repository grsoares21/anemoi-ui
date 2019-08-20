import { City } from '../Services/LocationServices';
import MultiCitySelector from '../Shared/MultiCitySelector';
import WorkflowStep from './WorkflowStep/WorkflowStep';

import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

export interface SelectedCities {
  departureCities: City[];
  visitingCities: City[];
  arrivalCities: City[];
}

interface CitySelectionWorkflowProps {
  isVisible: boolean;
  onComplete: (selectedCities: SelectedCities) => void;
}

const CitySelectionWorkflow: React.FC<CitySelectionWorkflowProps> = props => {
  let [departureCities, setDepartureCities] = useState<City[]>([]);
  let [visitingCities, setVisitingCities] = useState<City[]>([]);
  let [arrivalCities, setArrivalCities] = useState<City[]>([]);

  let [workflowStep, setWorkflowStep] = useState(0);
  let updateWorkflowStep = (step: number) => setWorkflowStep(Math.max(step, workflowStep));
  // to prevent coming backwards on the steps when re-executing animations' end callback

  return (
    <span>
      <WorkflowStep isVisible={props.isVisible} uniqueKey="departureCities">
        <h4><em>Primeiramente, eu gostaria de saber quais cidades poderiam ser seu ponto de partida.</em></h4>
        <div className="SelectorStep">
          <MultiCitySelector
              placeholder="Cidades de partida..."
              onChange={(cities) => {setDepartureCities(cities)}}
              onConfirm={() => updateWorkflowStep(1)} />
          <Button size="lg" onClick={() => departureCities.length > 0 && updateWorkflowStep(1)}>
            <b>↵</b>
          </Button>
        </div>
      </WorkflowStep>
      <WorkflowStep isVisible={workflowStep >= 1} uniqueKey="arrivalCities">
        <h4><em>Ótimo! E quais cidades poderiam ser seu ponto de chegada?</em></h4>
        <div className="SelectorStep">
          <MultiCitySelector
              placeholder="Cidades de chegada..."
              onChange={(cities) => {setArrivalCities(cities)}}
              onConfirm={() => updateWorkflowStep(2)} />
          <Button size="lg" onClick={() => arrivalCities.length > 0 && updateWorkflowStep(2)}>
            <b>↵</b>
          </Button>
        </div>
      </WorkflowStep>
      <WorkflowStep isVisible={workflowStep >= 2} uniqueKey="arrivalCities">
        <h4><em>Perfeito! E, finalmente, quais cidades você gostaria de visitar?</em></h4>
        <div className="SelectorStep">
          <MultiCitySelector
            placeholder="Cidades para visitar..."
            onChange={(cities) => {setVisitingCities(cities)}}
            onConfirm={() => props.onComplete({
              arrivalCities: arrivalCities,
              visitingCities: visitingCities,
              departureCities: departureCities
            })} />
          <Button size="lg" onClick={() => props.onComplete({
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
