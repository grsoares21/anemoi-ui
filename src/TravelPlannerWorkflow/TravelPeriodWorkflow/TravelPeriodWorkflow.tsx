import './TravelPeriodWorkflow.scss';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import React, { useState } from 'react';

import { Row, Col } from 'react-bootstrap';
import { DateRangePicker } from 'react-dates';
import moment, { Moment } from 'moment';

interface TravelPlanResultProps {
  minTravelDays: number;
  maxTravelDays: number;
}

interface DateRange {
  startDate: Moment | null;
  endDate: Moment | null;
}

const TravelPlanResult: React.FC<TravelPlanResultProps> = props => {
  const [departureDateRange, setDepartureDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null
  });
  const [departureFocusedInput, setDepartureFocusedInput] = useState<'startDate' | 'endDate' | null>(null);

  const [arrivalDateRange, setArrivalDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null
  });
  const [arrivalFocusedInput, setArrivalFocusedInput] = useState<'startDate' | 'endDate' | null>(null);

  return (
    <Row>
      <Col xs={12}>
        <label>Possível período de partida:</label>
        <br />
        <DateRangePicker
          {...departureDateRange}
          onDatesChange={dates => {
            setDepartureDateRange(dates);
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
          onDatesChange={setArrivalDateRange}
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