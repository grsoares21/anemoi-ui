import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import { TravelPlannerWorkflowContext } from '../TravelPlannerWorkflow.state';

const StayPeriodWorkflow: React.FC = () => {
  const {
    state: { visitingCities },
    dispatch
  } = useContext(TravelPlannerWorkflowContext);

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: 'white' }}>
      <ScrollView style={{ flex: 1 }}>
        <Text style={styles.title}>
          Soa como um bom plano! Para te ajudar a planejar ele, vou precisar saber por volta de quantos dias você deseja
          ficar em cada cidade:
        </Text>
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

                    dispatch({
                      type: 'setVisitingCities',
                      cities: newVisitingCities
                    });
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

                    dispatch({
                      type: 'setVisitingCities',
                      cities: newVisitingCities
                    });
                  }}
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ paddingVertical: 20, alignItems: 'center', flex: 1 }}
          onPress={() => {
            navigation.navigate('CitySelection');
          }}
        >
          <FontAwesome5 name="chevron-left" size={24} color="#FC427B" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingVertical: 20, alignItems: 'center', flex: 1 }}
          onPress={() => {
            navigation.navigate('TravelPeriod');
          }}
        >
          <FontAwesome5 name="chevron-right" size={24} color="#FC427B" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StayPeriodWorkflow;

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#6c757d'
  }
});
