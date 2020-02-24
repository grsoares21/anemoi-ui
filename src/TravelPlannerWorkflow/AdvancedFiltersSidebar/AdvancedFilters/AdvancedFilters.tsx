import React, { useContext } from 'react';
import './AdvancedFilters.scss';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { TravelPlannerWorkflowContext } from '../../TravelPlannerWorkflow.state';
import debounce from 'lodash.debounce';
import RangeSlider from '../../../Shared/RangeSlider/RangeSlider';

const AdvancedFilters: React.FC = () => {
  const { state, dispatch } = useContext(TravelPlannerWorkflowContext);

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
      <RangeSlider
        snap
        min={0}
        max={5}
        values={[state.maxStopsPerRoute]}
        onChange={values => dispatchSetMaxStops(values[0])}
      />
      <br />
      <label>{t('NUMBER_OF_TRAVELERS')}:</label>
      <RangeSlider
        snap
        min={1}
        max={9}
        values={[state.noOfTravelers]}
        onChange={values => dispatchSetNoOfTravelers(values[0])}
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
