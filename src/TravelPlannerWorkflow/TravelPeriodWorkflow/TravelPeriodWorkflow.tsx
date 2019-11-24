import './TravelPeriodWorkflow.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Row, Col } from 'react-bootstrap';
import { DateRangePicker } from 'react-dates';
import moment, { Moment } from 'moment';
import { TravelPlannerWorkflowContext } from '../TravelPlannerWorkflow.context';

type TravelPlanResultProps = {
  onComplete: () => void;
};

const TravelPeriodWorkflow: React.FC<TravelPlanResultProps> = props => {
  const [departureFocusedInput, setDepartureFocusedInput] = useState<'startDate' | 'endDate' | null>(null);
  const [arrivalFocusedInput, setArrivalFocusedInput] = useState<'startDate' | 'endDate' | null>(null);

  const { state, dispatch } = useContext(TravelPlannerWorkflowContext);

  const departureStartDate = state.departureDateRange.startDate;
  const departureEndDate = state.departureDateRange.endDate;
  const arrivalStartDate = state.arrivalDateRange.startDate;
  const arrivalEndDate = state.arrivalDateRange.endDate;

  const minTravelDays = state.visitingCities.reduce((accumulator, cityStayPeriod) => {
    return accumulator + cityStayPeriod.minDays;
  }, 0);
  const maxTravelDays = state.visitingCities.reduce((accumulator, cityStayPeriod) => {
    return accumulator + cityStayPeriod.maxDays;
  }, 0);

  const areArrivalDatesOutsideRange = (date: Moment) => {
    let [isBefore, isAfter] = [false, false];

    if (departureStartDate) {
      let minArrivalDate = moment(departureStartDate).add(minTravelDays, 'days');
      isBefore = date.isBefore(minArrivalDate);
    }
    if (departureEndDate) {
      let maxArrivalDate = moment(departureEndDate).add(maxTravelDays, 'days');
      isAfter = date.isAfter(maxArrivalDate);
    }

    return isAfter || isBefore || date.isBefore(moment());
  };

  const isArrivalDateRangeInvalid =
    arrivalStartDate &&
    arrivalEndDate &&
    (areArrivalDatesOutsideRange(moment(arrivalStartDate)) || areArrivalDatesOutsideRange(moment(arrivalEndDate)));

  const { t } = useTranslation();
  useEffect(() => {
    if (departureStartDate && departureEndDate && arrivalStartDate && arrivalEndDate) {
      props.onComplete();
    }
  }, [props, departureStartDate, departureEndDate, arrivalStartDate, arrivalEndDate]);

  return (
    <Row>
      <Col xs={12}>
        <label>{t('POSSIBLE_DEPARTURE_PERIOD')}</label>
        <DateRangePicker
          startDate={departureStartDate ? moment(departureStartDate) : null}
          endDate={departureEndDate ? moment(departureEndDate) : null}
          onDatesChange={({ startDate, endDate }) =>
            dispatch({
              type: 'setDateRanges',
              dateRanges: {
                departureDateRange: {
                  startDate: startDate ? startDate.toDate() : null,
                  endDate: endDate ? endDate.toDate() : null
                },
                arrivalDateRange: state.arrivalDateRange
              }
            })
          }
          minimumNights={0}
          focusedInput={departureFocusedInput}
          onFocusChange={setDepartureFocusedInput}
          startDateId="departureStartDate"
          endDateId="departureEndDate"
          startDatePlaceholderText={t('START_DATE')}
          endDatePlaceholderText={t('END_DATE')}
          numberOfMonths={1}
          openDirection="up"
          weekDayFormat="ddd"
        />
        <br />
      </Col>
      <Col xs={12}>
        <br />
        <label>{t('POSSIBLE_ARRIVAL_PERIOD')}</label>
        <div className={isArrivalDateRangeInvalid ? 'invalid' : ''}>
          <DateRangePicker
            startDate={arrivalStartDate ? moment(arrivalStartDate) : null}
            endDate={arrivalEndDate ? moment(arrivalEndDate) : null}
            onDatesChange={({ startDate, endDate }) =>
              dispatch({
                type: 'setDateRanges',
                dateRanges: {
                  departureDateRange: state.departureDateRange,
                  arrivalDateRange: {
                    startDate: startDate ? startDate.toDate() : null,
                    endDate: endDate ? endDate.toDate() : null
                  }
                }
              })
            }
            minimumNights={0}
            focusedInput={arrivalFocusedInput}
            onFocusChange={setArrivalFocusedInput}
            startDateId="arrivalStartDate"
            endDateId="arrivalEndDate"
            startDatePlaceholderText={t('START_DATE')}
            endDatePlaceholderText={t('END_DATE')}
            numberOfMonths={1}
            openDirection="up"
            weekDayFormat="ddd"
            initialVisibleMonth={() =>
              departureStartDate ? moment(departureStartDate).add(minTravelDays, 'days') : moment()
            }
            isOutsideRange={areArrivalDatesOutsideRange}
          />
          <span className="InvalidMessage">{t('INVALID_ARRIVAL_DATE_RANGE')}</span>
        </div>
      </Col>
    </Row>
  );
};

export default TravelPeriodWorkflow;
