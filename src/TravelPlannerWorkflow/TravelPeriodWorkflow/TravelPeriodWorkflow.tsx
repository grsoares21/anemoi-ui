import './TravelPeriodWorkflow.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Row, Col } from 'react-bootstrap';
import { DateRangePicker } from 'react-dates';
import moment, { Moment } from 'moment';
import { DateRange } from '../TravelPlannerWorkflow.d';

type TravelPlanResultProps = {
  minTravelDays: number;
  maxTravelDays: number;
  departureDateRange: DateRange;
  arrivalDateRange: DateRange;
  onChange: (departureDateRange: DateRange, arrivalDateRange: DateRange) => void;
  onComplete: () => void;
}

const TravelPeriodWorkflow: React.FC<TravelPlanResultProps> = props => {
  const [departureFocusedInput, setDepartureFocusedInput] = useState<'startDate' | 'endDate' | null>(null);
  const [arrivalFocusedInput, setArrivalFocusedInput] = useState<'startDate' | 'endDate' | null>(null);

  const departureStartDate = props.departureDateRange.startDate;
  const departureEndDate = props.departureDateRange.endDate;
  const arrivalStartDate = props.arrivalDateRange.startDate;
  const arrivalEndDate = props.arrivalDateRange.endDate;

  const areArrivalDatesOutsideRange = (date: Moment) => {
    let [isBefore, isAfter] = [false, false];

    if(departureStartDate) {
      let minArrivalDate = moment(departureStartDate).add(props.minTravelDays, 'days');
      isBefore = date.isBefore(minArrivalDate);
    }
    if(departureEndDate) {
      let maxArrivalDate = moment(departureEndDate).add(props.maxTravelDays, 'days');
      isAfter = date.isAfter(maxArrivalDate);
    }

    return isAfter || isBefore || date.isBefore(moment());
  };

  const isArrivalDateRangeInvalid = arrivalStartDate &&
                                    arrivalEndDate &&
                                    (areArrivalDatesOutsideRange(moment(arrivalStartDate)) ||
                                    areArrivalDatesOutsideRange(moment(arrivalEndDate)));

  const { t } = useTranslation();
  useEffect(() => {
    if(departureStartDate && departureEndDate && arrivalStartDate && arrivalEndDate) {
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
          onDatesChange={
            ({startDate, endDate}) => props.onChange(
              {startDate: startDate ? startDate.toDate() : null, endDate: endDate ? endDate.toDate() : null},
              props.arrivalDateRange
            )
          }
          focusedInput={departureFocusedInput}
          onFocusChange={setDepartureFocusedInput}
          startDateId="departureStartDate"
          endDateId="departureEndDate"
          startDatePlaceholderText={t('START_DATE')}
          endDatePlaceholderText={t('END_DATE')}
          numberOfMonths={1}
          openDirection="up"
          weekDayFormat="ddd" />
        <br />
      </Col>
      <Col xs={12}>
        <br />
        <label>{t('POSSIBLE_ARRIVAL_PERIOD')}</label>
        <div className={isArrivalDateRangeInvalid ? 'invalid' : ''}>
          <DateRangePicker
            startDate={arrivalStartDate ? moment(arrivalStartDate) : null}
            endDate={arrivalEndDate ? moment(arrivalEndDate) : null}
            onDatesChange={
              ({startDate, endDate}) => props.onChange(
                props.departureDateRange,
                {startDate: startDate ? startDate.toDate() : null, endDate: endDate ? endDate.toDate() : null}
              )
            }
            focusedInput={arrivalFocusedInput}
            onFocusChange={setArrivalFocusedInput}
            startDateId="arrivalStartDate"
            endDateId="arrivalEndDate"
            startDatePlaceholderText={t('START_DATE')}
            endDatePlaceholderText={t('END_DATE')}
            numberOfMonths={1}
            openDirection="up"
            weekDayFormat="ddd"
            initialVisibleMonth={() => departureStartDate ? moment(departureStartDate).add(props.minTravelDays, 'days') : moment()}
            isOutsideRange={areArrivalDatesOutsideRange} />
          <span className="InvalidMessage">{t('INVALID_ARRIVAL_DATE_RANGE')}</span>  
        </div>
      </Col>
    </Row>
  );
}

export default TravelPeriodWorkflow;