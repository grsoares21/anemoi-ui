import React from 'react';
import Rheostat from 'rheostat';

interface RangeSliderProps {
  snap: boolean;
  min: number;
  max: number;
  values: number[];
  onChange: (values: number[]) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = props => {
  return (
    <Rheostat
      snap={props.snap}
      min={props.min}
      max={props.max}
      values={props.values}
      onValuesUpdated={({ values }) => props.onChange(values)}
    />
  );
};

export default RangeSlider;
