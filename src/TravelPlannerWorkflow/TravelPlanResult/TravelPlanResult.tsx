import React, { Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import TravelPlanResult from '../../Services/AnemoiServices/TravelPlanResult';

import RouteResult from './RouteResult/RouteResult';
import { Button } from 'react-bootstrap';
import { CurrencyContext } from './../../Shared/CurrecyContext';

declare var gtag: Gtag.Gtag;

interface TravelPlanResultProps {
  result: TravelPlanResult;
}

const TravelPlanResultComponent: React.FC<TravelPlanResultProps> = props => {
  const { t, i18n } = useTranslation();
  const { currency } = useContext(CurrencyContext);
  const priceFormatter = new Intl.NumberFormat(i18n.language, { style: 'currency', currency});
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
      <h4><em>{t('TOTAL_PRICE')}</em> {priceFormatter.format(props.result.totalPrice)}</h4>
      <Button block size="lg" variant="success" onClick={() => {
        gtag('event', 'ClickedToBook', {
          event_label: 'User clicked "Click Here to Book" button',
          event_category: 'conversion',
          value: props.result.totalPrice
        });
        window.open(props.result.deepLink, '_blank');
      }}>
        <b>{t('CLICK_HERE_TO_BOOK')}</b>
      </Button>
    </div>
  );
}

export default TravelPlanResultComponent;