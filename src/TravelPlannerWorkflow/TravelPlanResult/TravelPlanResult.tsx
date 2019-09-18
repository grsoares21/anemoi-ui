import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import TravelPlanResult from '../../Services/AnemoiServices/TravelPlanResult';

import RouteResult from './RouteResult/RouteResult';
import { Button } from 'react-bootstrap';

interface TravelPlanResultProps {
  result: TravelPlanResult;
}

const TravelPlanResultComponent: React.FC<TravelPlanResultProps> = props => {
  const { t } = useTranslation();
  return (
    <div>
      <h4><em>{t('BEST_ROUTE_FOUND')}</em></h4>
      <h4>{t('HERE_IS_YOUR_TRAVEL_PLAN')}</h4>
      {props.result.routes.map(route => (
        <Fragment key={`${route.source.cityName}-${route.destination.cityName}`}>
          <br />
          <RouteResult route={route} />
        </Fragment>
        )
      )}
      <br />
      {/* TODO: localize currency */}
      <h4><em>{t('TOTAL_PRICE')}</em> R$ {props.result.totalPrice.toFixed(2).replace('.', ',')}</h4>
      <Button block size="lg" variant="success" onClick={() => window.open(props.result.deepLink, '_blank')}>
        <b>{t('CLICK_HERE_TO_BOOK')}</b>
      </Button>
    </div>
  );
}

export default TravelPlanResultComponent;