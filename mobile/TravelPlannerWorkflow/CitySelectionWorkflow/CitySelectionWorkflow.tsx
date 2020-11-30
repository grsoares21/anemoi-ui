import { City } from '@anemoi-ui/services';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch } from 'react-native';
import MultiCitySelector from '../../shared/MultiCitySelector/MultiCitySelector';

const CitySelectionWorkflow: React.FC = () => {
  const [departureCities, setDepartureCities] = useState<City[]>([]);
  const [visitingCities, setVisitingCities] = useState<City[]>([]);
  const [arrivalCities, setArrivalCities] = useState<City[]>([]);

  const [sameDepartureArrival, setSameDepartureArrival] = useState(false);

  return (
    <>
      <Text style={styles.highlightedTitle}>
        Primeiramente, eu preciso saber quais são seus possíveis pontos de
        partida, quais cidades você deseja visitar e os possíveis destinos
        finais.
      </Text>
      <Text style={styles.inputLabel}>Possíveis pontos de partida:</Text>
      <MultiCitySelector
        setCities={cities => setDepartureCities(cities)}
        cities={departureCities}
      />
      <Text style={styles.inputLabel}>Cidades para visitar:</Text>
      <MultiCitySelector
        setCities={cities => setVisitingCities(cities)}
        cities={visitingCities}
      />
      <Text style={styles.inputLabel}>Possíveis destinos finais:</Text>
      <MultiCitySelector
        disabled={sameDepartureArrival}
        setCities={cities => setArrivalCities(cities)}
        cities={arrivalCities}
      />
      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        <Switch
          trackColor={{ false: '#767577', true: '#FC427B' }}
          thumbColor={'#f4f3f4'}
          onValueChange={value => {
            setSameDepartureArrival(value);
            setArrivalCities([]);
          }}
          value={sameDepartureArrival}
        />
        <Text style={{ flex: 1, marginLeft: 10, fontSize: 13 }}>
          Usar os mesmos pontos de partida e destinos finais (ida e volta)
        </Text>
      </View>
    </>
  );
};

export default CitySelectionWorkflow;

const styles = StyleSheet.create({
  highlightedTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FC427B'
  },
  inputLabel: {
    fontSize: 15,
    marginVertical: 5
  }
});
