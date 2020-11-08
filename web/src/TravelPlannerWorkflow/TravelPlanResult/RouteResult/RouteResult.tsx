import './RouteResult.scss';

import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { Route } from '@anemoi-ui/services';
import FlagIcon from '../../../Shared/FlagIcon';

import AirPlaneTravelIcon from './airplane-travel-icon.svg';
import AirPlaneTravelIconDark from './airplane-travel-icon-dark.svg';
import { useTranslation } from 'react-i18next';
import useTheme from '../../../Shared/useTheme';

interface RouteResultProps {
  route: Route;
}

const RouteResult: React.FC<RouteResultProps> = props => {
  // TODO: get locale context
  const { i18n } = useTranslation();
  const locale = i18n.language;
  const dateStringOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  };

  const themeClass = useTheme();

  return (
    <Row className={`RouteResult ${themeClass}`}>
      <Col xs={4} className="RouteCity">
        <FlagIcon
          className={`FlagIcon ${themeClass}`}
          size="3x"
          squared
          code={props.route.source.countryCode.toLowerCase()}
        />
        <br />
        <span className={`CityLabel ${themeClass}`}>
          {props.route.source.cityName}, {props.route.source.countryName}
        </span>
        <br />
        <span className="DateLabel">
          {new Date(props.route.startTime).toLocaleDateString(
            locale,
            dateStringOptions
          )}
        </span>
      </Col>
      <Col xs={4} className="RouteSign my-auto">
        <img
          src={
            themeClass === 'Dark' ? AirPlaneTravelIconDark : AirPlaneTravelIcon
          }
          alt="Airplane Travel"
        />
      </Col>
      <Col xs={4} className="RouteCity">
        <FlagIcon
          className={`FlagIcon ${themeClass}`}
          size="3x"
          squared
          code={props.route.destination.countryCode.toLowerCase()}
        />
        <br />
        <span className={`CityLabel ${themeClass}`}>
          {props.route.destination.cityName},{' '}
          {props.route.destination.countryName}
        </span>
        <br />
        <span className="DateLabel">
          {new Date(props.route.endTime).toLocaleDateString(
            locale,
            dateStringOptions
          )}
        </span>
      </Col>
    </Row>
  );
};

export default RouteResult;
