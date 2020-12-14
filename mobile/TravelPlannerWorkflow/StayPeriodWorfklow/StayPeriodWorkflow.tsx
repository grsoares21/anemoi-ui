import React, { useState } from 'react';
import { View, Text } from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import { CityStayPeriod } from '../TravelPlannerWorkflow.d';

interface StayPeriodWorkflowProps {
  visitingCities: CityStayPeriod[];
  onSetVisitingCities: (visitingCities: CityStayPeriod[]) => void;
}

const StayPeriodWorkflow: React.FC<StayPeriodWorkflowProps> = ({ visitingCities, onSetVisitingCities }) => {
  return (
    <View>
      {visitingCities.map(({ city, maxDays, minDays }, i) => (
        <View key={i}>
          <Text>{`Eu gostaria de ficar em ${city.name} entre ${minDays} e ${maxDays} dias.`}</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginRight: 20 }}>
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
                onChange={value => {
                  let newVisitingCities = [...visitingCities];
                  let cityIndex = visitingCities.findIndex(visitingCity => visitingCity.city.id === city.id);
                  if (value > maxDays) maxDays = value;

                  newVisitingCities[cityIndex] = { city, maxDays, minDays: value };

                  onSetVisitingCities(newVisitingCities);
                }}
              />
            </View>
            <View>
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
                onChange={value => {
                  let newVisitingCities = [...visitingCities];
                  let cityIndex = visitingCities.findIndex(visitingCity => visitingCity.city.id === city.id);
                  if (value < minDays) minDays = value;

                  newVisitingCities[cityIndex] = { city, maxDays: value, minDays };

                  onSetVisitingCities(newVisitingCities);
                }}
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default StayPeriodWorkflow;
