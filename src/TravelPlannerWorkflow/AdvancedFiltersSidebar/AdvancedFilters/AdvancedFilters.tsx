import React, { useContext } from 'react';
import './AdvancedFilters.scss';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { TravelPlannerWorkflowContext } from '../../TravelPlannerWorkflow.state';
import RangeSlider from '../../../Shared/RangeSlider/RangeSlider';
import useTheme from '../../../Shared/useTheme';

const AdvancedFilters: React.FC = () => {
  const { state, dispatch } = useContext(TravelPlannerWorkflowContext);
  const { t } = useTranslation();
  const themeClass = useTheme();

  return (
    <div className={`AdvancedFilters ${themeClass}`}>
      <h4>{t('ADVANCED_FILTERS')}:</h4>
      <br />
      <label>{t('MAX_STOPS_PER_ROUTE')}:</label>
      <RangeSlider
        snap
        min={0}
        max={5}
        values={[state.maxStopsPerRoute]}
        onChange={values => dispatch({ type: 'setMaxStopsPerRoute', maxStops: values[0] })}
      />
      <br />
      <label>{t('NUMBER_OF_TRAVELERS')}:</label>
      <RangeSlider
        snap
        min={1}
        max={9}
        values={[state.noOfTravelers]}
        onChange={values => dispatch({ type: 'setNoOfTravelers', noOfTravelers: values[0] })}
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
