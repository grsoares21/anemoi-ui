import React from 'react';
import Rheostat from 'rheostat';
import './RangeSlider.scss';

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
      {value}
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
      onValuesUpdated={({ values }) => props.onChange(values)}
    />
  );
};

export default RangeSlider;
