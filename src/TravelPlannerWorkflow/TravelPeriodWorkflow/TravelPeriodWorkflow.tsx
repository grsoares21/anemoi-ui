import './TravelPeriodWorkflow.scss';
import 'react-datepicker/dist/react-datepicker.css';

import React, { useState } from 'react';

import WorkflowStep from '../WorkflowStep/WorkflowStep';

import { Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';

interface TravelPlanResultProps {
  isVisible: boolean;
}

const TravelPlanResult: React.FC<TravelPlanResultProps> = props => {
  const [departureDateRange, setDepartureRangeDate] = useState({
    startDate: moment(),
    endDate: moment().add(5, 'days')
  });

  return (
    <WorkflowStep isVisible={props.isVisible} uniqueKey="travelPeriodWorkflow" isFocused>
      <h4>Para quando você está planejando esta viagem?</h4>
      <Row>
        <Col xs={6}>
          <DatePicker
            selected={departureDateRange.startDate.toDate()}
            selectsStart
            startDate={departureDateRange.startDate.toDate()}
            endDate={departureDateRange.endDate.toDate()}
            onChange={(startDate: Date) => setDepartureRangeDate({...departureDateRange, startDate: moment(startDate)})}
          />
          <DatePicker
            selected={departureDateRange.endDate.toDate()}
            selectsEnd
            startDate={departureDateRange.startDate.toDate()}
            endDate={departureDateRange.endDate.toDate()}
            onChange={(endDate: Date) => setDepartureRangeDate({...departureDateRange, endDate: moment(endDate)})}
            minDate={departureDateRange.startDate.toDate()}
          />
        </Col>
        <Col xs={6}>
        </Col>
      </Row>
    </WorkflowStep>
  );
}

export default TravelPlanResult;