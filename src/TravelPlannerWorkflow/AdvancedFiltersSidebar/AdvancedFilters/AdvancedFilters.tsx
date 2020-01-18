import React, { useState } from 'react';
import InputRange from 'react-input-range';
import './AdvancedFilters.scss';
import { Form } from 'react-bootstrap';

const AdvancedFilters: React.FC = props => {
  const [maxStops, setMaxStops] = useState(2);
  const [noOfTravelers, setNoOfTravelers] = useState(1);
  const [criteria, setCriteria] = useState('price');

  return (
    <div className="AdvancedFilters">
      <label>Maximum stops per route:</label>
      <InputRange minValue={0} maxValue={5} value={maxStops} onChange={value => setMaxStops(value as number)} />
      <br />
      <label>Number of travelers:</label>
      <InputRange
        minValue={1}
        maxValue={9}
        value={noOfTravelers}
        onChange={value => setNoOfTravelers(value as number)}
      />
      <br />
      <label>Preferred criteria:</label>
      <Form.Group>
        <Form.Check
          name="preferredCriteria"
          inline
          type="radio"
          label="Price"
          id="price-radio"
          onClick={() => setCriteria('price')}
          checked={criteria === 'price'}
        />
        <Form.Check
          name="preferredCriteria"
          inline
          type="radio"
          label="Quality"
          id="quality-radio"
          onClick={() => setCriteria('quality')}
          checked={criteria === 'quality'}
        />
        <Form.Check
          name="preferredCriteria"
          inline
          type="radio"
          label="Duration"
          id="duration-radio"
          onClick={() => setCriteria('duration')}
          checked={criteria === 'duration'}
        />
      </Form.Group>
    </div>
  );
};

export default AdvancedFilters;
