import { City } from '@anemoi-ui/services';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch } from 'react-native';
import MultiCitySelector from '../../shared/MultiCitySelector/MultiCitySelector';
import { CityStayPeriod } from '../TravelPlannerWorkflow.d';

interface CitySelectionWorkflowProps {
  departureCities: City[];
  setDepartureCities: (cities: City[]) => void;
  visitingCities: CityStayPeriod[];
  setVisitingCities: (cities: CityStayPeriod[]) => void;
  arrivalCities: City[];
  setArrivalCities: (cities: City[]) => void;
}

const CitySelectionWorkflow: React.FC<CitySelectionWorkflowProps> = ({
  departureCities,
  setDepartureCities,
  visitingCities,
  setVisitingCities,
  arrivalCities,
  setArrivalCities
}) => {
  const [sameDepartureArrival, setSameDepartureArrival] = useState(false);

  return (
    <>
      <Text style={styles.highlightedTitle}>
        Primeiramente, eu preciso saber quais são seus possíveis pontos de partida, quais cidades você deseja visitar e
        os possíveis destinos finais.
      </Text>
      <Text style={styles.inputLabel}>Possíveis pontos de partida:</Text>
      <MultiCitySelector setCities={cities => setDepartureCities(cities)} cities={departureCities} />
      <Text style={styles.inputLabel}>Cidades para visitar:</Text>
      <MultiCitySelector
        onAddCity={city => setVisitingCities([...visitingCities, { city, minDays: 3, maxDays: 5 }])}
        onRemoveCity={city =>
          setVisitingCities(visitingCities.filter(visitingCity => visitingCity.city.id !== city.id))
        }
        cities={visitingCities.map(cityStayPeriod => cityStayPeriod.city)}
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
