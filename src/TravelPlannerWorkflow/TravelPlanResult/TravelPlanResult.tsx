import './TravelPlanResult.scss';

import React from 'react';

import WorkflowStep from '../WorkflowStep/WorkflowStep';

interface TravelPlanResultProps {
  isVisible: boolean;
}

const TravelPlanResult: React.FC<TravelPlanResultProps> = props => {
  return (
    <WorkflowStep isVisible={props.isVisible} uniqueKey="stayPeriodSelection">
      <h4>Melhor rota encontrada! Aqui está o seu plano de viagem:</h4>
    </WorkflowStep>
  );
}

export default TravelPlanResult;