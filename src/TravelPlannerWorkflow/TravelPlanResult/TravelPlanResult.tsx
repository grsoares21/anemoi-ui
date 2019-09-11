import React, { Fragment } from 'react';
import TravelPlanResult from '../../Services/AnemoiServices/TravelPlanResult';

import RouteResult from './RouteResult/RouteResult';
import { Button } from 'react-bootstrap';

interface TravelPlanResultProps {
  result: TravelPlanResult;
}

const TravelPlanResultComponent: React.FC<TravelPlanResultProps> = props => {
  return (
    <div>
      <h4><em>Melhor rota encontrada!</em></h4>
      <h4>Aqui está o seu plano de viagem:</h4>
      {props.result.routes.map(route => (
        <Fragment key={`${route.source}-${route.destination}`}>
          <RouteResult route={route} />
        </Fragment>
        )
      )}
      <h4><em>Preço total:</em> R$ {props.result.totalPrice.toFixed(2).replace('.', ',')}</h4>
      <Button block size="lg" variant="success" onClick={() => window.open(props.result.deepLink, '_blank')}>
        <b>Clique aqui para reservar</b>
      </Button>
    </div>
  );
}

export default TravelPlanResultComponent;