import React from 'react';
import Rheostat from 'rheostat';
import './RangeSlider.scss';
import debounce from 'lodash.debounce';
import useTheme from '../useTheme';

interface RangeSliderProps {
  snap: boolean;
  min: number;
  max: number;
  values: number[];
  onChange: (values: number[]) => void;
}

const SliderHandle: React.FC<{ handleRef: any; 'aria-valuenow': any }> = ({ handleRef, ...passProps }) => {
  const value = passProps['aria-valuenow'];
  const themeClass = useTheme();
  return (
    <div className={`RangeSliderHandle ${themeClass}`} ref={handleRef} {...passProps}>
      <span>{value}</span>
    </div>
  );
};

const SliderProgressBar: React.FC<{ handleRef: any }> = ({ handleRef, ...passProps }) => {
  const themeClass = useTheme();
  return (
    <div
      className={`
      DefaultProgressBar_progressBar
      DefaultProgressBar_progressBar_1
      DefaultProgressBar_background__horizontal
      DefaultProgressBar_background__horizontal_2
      ${themeClass}`}
      ref={handleRef}
      {...passProps}
    ></div>
  );
};

const SliderBackground: React.FC = () => {
  const themeClass = useTheme();
  return (
    <div
      className={`
        DefaultBackground
        DefaultBackground_1
        DefaultBackground_background__horizontal
        DefaultBackground_background__horizontal_2
        ${themeClass}`}
    ></div>
  );
};

const RangeSlider: React.FC<RangeSliderProps> = (props) => {
  return (
    <Rheostat
      className="lalala"
      background={SliderBackground}
      progressBar={SliderProgressBar}
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
