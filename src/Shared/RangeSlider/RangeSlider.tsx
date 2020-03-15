import React from 'react';
import Rheostat from 'rheostat';
import './RangeSlider.scss';
import debounce from 'lodash.debounce';

interface RangeSliderProps {
  snap: boolean;
  min: number;
  max: number;
  values: number[];
  onChange: (values: number[]) => void;
}

const SliderHandle: React.FC<{ handleRef: any; 'aria-valuenow': any }> = ({ handleRef, ...passProps }) => {
  const value = passProps['aria-valuenow'];
  return (
    <div className="RangeSliderHandle" ref={handleRef} {...passProps}>
      <span>{value}</span>
    </div>
  );
};

const RangeSlider: React.FC<RangeSliderProps> = props => {
  return (
    <Rheostat
      handle={SliderHandle}
      snap={props.snap}
      min={props.min}
      max={props.max}
      values={props.values}
      onValuesUpdated={debounce(({ values }) => props.onChange(values), 0)}
    />
  );
};

export default RangeSlider;
