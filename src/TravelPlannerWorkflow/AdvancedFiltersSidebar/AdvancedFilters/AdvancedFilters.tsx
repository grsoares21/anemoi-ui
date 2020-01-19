import React, { useState } from 'react';
import InputRange from 'react-input-range';
import './AdvancedFilters.scss';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const AdvancedFilters: React.FC = props => {
  const [maxStops, setMaxStops] = useState(2);
  const [noOfTravelers, setNoOfTravelers] = useState(1);
  const [criteria, setCriteria] = useState('price');

  const { t } = useTranslation();

  return (
    <div className="AdvancedFilters">
      <h4>{t('ADVANCED_FILTERS')}:</h4>
      <br />
      <label>{t('MAX_STOPS_PER_ROUTE')}:</label>
      <InputRange minValue={0} maxValue={5} value={maxStops} onChange={value => setMaxStops(value as number)} />
      <br />
      <label>{t('NUMBER_OF_TRAVELERS')}:</label>
      <InputRange
        minValue={1}
        maxValue={9}
        value={noOfTravelers}
        onChange={value => setNoOfTravelers(value as number)}
      />
      <br />
      <label>{t('PREFERRED_CRITERIA')}:</label>
      <Form.Group>
        <Form.Check
          name="preferredCriteria"
          inline
          type="radio"
          label={t('PRICE')}
          id="price-radio"
          onClick={() => setCriteria('price')}
          checked={criteria === 'price'}
        />
        <Form.Check
          name="preferredCriteria"
          inline
          type="radio"
          label={t('QUALITY')}
          id="quality-radio"
          onClick={() => setCriteria('quality')}
          checked={criteria === 'quality'}
        />
        <Form.Check
          name="preferredCriteria"
          inline
          type="radio"
          label={t('DURATION')}
          id="duration-radio"
          onClick={() => setCriteria('duration')}
          checked={criteria === 'duration'}
        />
      </Form.Group>
    </div>
  );
};

export default AdvancedFilters;
