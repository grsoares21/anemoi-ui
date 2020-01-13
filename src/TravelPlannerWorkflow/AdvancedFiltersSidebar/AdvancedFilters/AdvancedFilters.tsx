import React, { useState } from 'react';
import InputRange from 'react-input-range';
import './AdvancedFilters.scss';

const AdvancedFilters: React.FC = props => {
  const [maxStops, setMaxStops] = useState(2);

  return (
    <div className="AdvancedFilters">
      <label>Maximum stops per route:</label>
      <InputRange minValue={0} maxValue={5} value={maxStops} onChange={value => setMaxStops(value as number)} />
    </div>
  );
};

export default AdvancedFilters;
