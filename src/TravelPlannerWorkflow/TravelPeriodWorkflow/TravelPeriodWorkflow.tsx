import './TravelPeriodWorkflow.scss';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import React, { useState, useEffect } from 'react';

import { Row, Col } from 'react-bootstrap';
import { DateRangePicker } from 'react-dates';
import moment, { Moment } from 'moment';

import { DateRange } from '../../Services/AnemoiServices/TravelPlanParameters';

interface TravelPlanResultProps {
  minTravelDays: number;
  maxTravelDays: number;
  onComplete: (departueMomentDateRange: DateRange, arrivalDateRange: DateRange) => void;
}

interface MomentDateRange {
  startDate: Moment | null;
  endDate: Moment | null;
}

const TravelPlanResult: React.FC<TravelPlanResultProps> = props => {
  const [departureDateRange, setdepartureDateRange] = useState<MomentDateRange>({
    startDate: null,
    endDate: null
  });
  const [departureFocusedInput, setDepartureFocusedInput] = useState<'startDate' | 'endDate' | null>(null);

  const [arrivalDateRange, setarrivalDateRange] = useState<MomentDateRange>({
    startDate: null,
    endDate: null
  });
  const [arrivalFocusedInput, setArrivalFocusedInput] = useState<'startDate' | 'endDate' | null>(null);

  useEffect(() => {
    if(departureDateRange.startDate &&
       departureDateRange.endDate &&
       arrivalDateRange.startDate &&
       arrivalDateRange.endDate
       ) {
         props.onComplete(
           { startDate: departureDateRange.startDate.toISOString(), endDate: departureDateRange.endDate.toISOString() },
           { startDate: arrivalDateRange.startDate.toISOString(), endDate: arrivalDateRange.endDate.toISOString() });
       }
  }, [arrivalDateRange, departureDateRange])
  return (
    <Row>
      <Col xs={12}>
        <label>Possível período de partida:</label>
        <br />
        <DateRangePicker
          {...departureDateRange}
          onDatesChange={dates => {
            setdepartureDateRange(dates);
            if(departureFocusedInput === 'endDate')
              setArrivalFocusedInput('startDate');
          }}
          focusedInput={departureFocusedInput}
          onFocusChange={setDepartureFocusedInput}
          startDateId="departureStartDate"
          endDateId="departureEndDate"
          numberOfMonths={1}
          openDirection="up" />
        <br />
      </Col>
      <Col xs={12}>
        <br />
        <label>Possível período de chegada:</label>
        <br />
        <DateRangePicker
          {...arrivalDateRange}
          onDatesChange={setarrivalDateRange}
          focusedInput={arrivalFocusedInput}
          onFocusChange={setArrivalFocusedInput}
          startDateId="arrivalStartDate"
          endDateId="arrivalEndDate"
          numberOfMonths={1}
          openDirection="up"
          isOutsideRange={(date: Moment) => {
            let [isBefore, isAfter] = [false, false];

            if(departureDateRange.startDate) {
              let minArrivalDate = moment(departureDateRange.startDate).add(props.minTravelDays, 'days');
              isBefore = date.isBefore(minArrivalDate);
            }
            if(departureDateRange.endDate) {
              let maxArrivalDate = moment(departureDateRange.endDate).add(props.maxTravelDays, 'days');
              isAfter = date.isAfter(maxArrivalDate);
            }

            return isAfter || isBefore || date.isBefore(moment());
          }} />
      </Col>
    </Row>
  );
}

export default TravelPlanResult;