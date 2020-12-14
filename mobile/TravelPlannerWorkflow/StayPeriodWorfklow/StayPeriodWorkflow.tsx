import React, { useState } from 'react';
import { View, Text } from 'react-native';
import InputSpinner from 'react-native-input-spinner';

interface StayPeriodWorkflowProps {
  cities: string[];
}

const StayPeriodWorkflow: React.FC<StayPeriodWorkflowProps> = ({ cities }) => {
  const [periods, setPeriods] = useState(
    cities.map(city => ({ city, minDays: 3, maxDays: 5 }))
  );

  return (
    <View>
      {periods.map(({ city, maxDays, minDays }, i) => (
        <View key={i}>
          <Text>{`Eu gostaria de ficar em ${city} entre ${minDays} e ${maxDays} dias.`}</Text>
          <Text>{`Mínimo:`}</Text>
          <InputSpinner
            showBorder
            rounded={false}
            max={30}
            min={1}
            step={1}
            colorMax={'#f04048'}
            colorMin={'#40c5f4'}
            value={minDays}
            onChange={value =>
              setPeriods(
                periods.map(period => {
                  if (period.city === city) {
                    return { ...period, minDays: value };
                  } else {
                    return period;
                  }
                })
              )
            }
          />
          <Text>{`Máximo:`}</Text>
          <InputSpinner
            showBorder
            rounded={false}
            max={30}
            min={1}
            step={1}
            colorMax={'#f04048'}
            colorMin={'#40c5f4'}
            value={maxDays}
            onChange={value =>
              setPeriods(
                periods.map(period => {
                  if (period.city === city) {
                    return { ...period, maxDays: value };
                  } else {
                    return period;
                  }
                })
              )
            }
          />
        </View>
      ))}
    </View>
  );
};

export default StayPeriodWorkflow;
