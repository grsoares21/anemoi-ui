import React, { useContext, useState } from 'react';
import InputRange from 'react-input-range';
import './AdvancedFilters.scss';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { TravelPlannerWorkflowContext } from '../../TravelPlannerWorkflow.state';
import debounce from 'lodash.debounce';

const AdvancedFilters: React.FC = () => {
  const { state, dispatch } = useContext(TravelPlannerWorkflowContext);

  const [maxStopsPerRoute, setMaxStops] = useState(state.maxStopsPerRoute);
  const [noOfTravelers, setNoOfTravelers] = useState(state.noOfTravelers);

  const dispatchSetMaxStops = debounce((maxStops: number) => dispatch({ type: 'setMaxStopsPerRoute', maxStops }), 500);
  const dispatchSetNoOfTravelers = debounce(
    (noOfTravelers: number) => dispatch({ type: 'setNoOfTravelers', noOfTravelers }),
    500
  );

  const { t } = useTranslation();

  return (
    <div className="AdvancedFilters">
      <h4>{t('ADVANCED_FILTERS')}:</h4>
      <br />
      <label>{t('MAX_STOPS_PER_ROUTE')}:</label>
      <InputRange
        minValue={0}
        maxValue={5}
        value={maxStopsPerRoute}
        onChange={maxStops => {
          setMaxStops(maxStops as number);
          dispatchSetMaxStops(maxStops as number);
        }}
      />
      <br />
      <label>{t('NUMBER_OF_TRAVELERS')}:</label>
      <InputRange
        minValue={1}
        maxValue={9}
        value={noOfTravelers}
        onChange={noOfTravelers => {
          setNoOfTravelers(noOfTravelers as number);
          dispatchSetNoOfTravelers(noOfTravelers as number);
        }}
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
          onChange={() => dispatch({ type: 'setPreferredCritera', criteria: 'price' })}
          checked={state.preferredCriteria === 'price'}
        />
        <Form.Check
          name="preferredCriteria"
          inline
          type="radio"
          label={t('QUALITY')}
          id="quality-radio"
          onChange={() => dispatch({ type: 'setPreferredCritera', criteria: 'quality' })}
          checked={state.preferredCriteria === 'quality'}
        />
        <Form.Check
          name="preferredCriteria"
          inline
          type="radio"
          label={t('DURATION')}
          id="duration-radio"
          onChange={() => dispatch({ type: 'setPreferredCritera', criteria: 'duration' })}
          checked={state.preferredCriteria === 'duration'}
        />
      </Form.Group>
    </div>
  );
};

export default AdvancedFilters;
