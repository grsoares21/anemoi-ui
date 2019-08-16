import './TravelPeriodWorkflow.scss';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import React, { useState } from 'react';

import WorkflowStep from '../WorkflowStep/WorkflowStep';

import { Row, Col } from 'react-bootstrap';
import { DateRangePicker } from 'react-dates';
import { Moment } from 'moment';

interface TravelPlanResultProps {
  minTravelDays: number;
  maxTravelDays: number;
  isVisible: boolean;
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
    <WorkflowStep isVisible={props.isVisible} uniqueKey="travelPeriodWorkflow" isFocused>
      <h4>Para quando você está planejando esta viagem?</h4>
      <Row>
        <Col xs={6}>
          <label>Possível período de partida:</label>
          <DateRangePicker
            {...departureDateRange}
            onDatesChange={setDepartureDateRange}
            focusedInput={departureFocusedInput}
            onFocusChange={setDepartureFocusedInput}
            startDateId="departureStartDate"
            endDateId="departureEndDate"
            numberOfMonths={1}
            openDirection="up" />
        </Col>
        <Col xs={6}>
          <label>Possível período de chegada:</label>
          <DateRangePicker
            {...arrivalDateRange}
            onDatesChange={setArrivalDateRange}
            focusedInput={arrivalFocusedInput}
            onFocusChange={setArrivalFocusedInput}
            startDateId="arrivalStartDate"
            endDateId="arrivalEndDate"
            numberOfMonths={1}
            openDirection="up" />
        </Col>
      </Row>
    </WorkflowStep>
  );
}

export default TravelPlanResult;