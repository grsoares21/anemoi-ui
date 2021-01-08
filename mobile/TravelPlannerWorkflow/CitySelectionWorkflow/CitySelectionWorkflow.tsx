import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MultiCitySelector from '../../shared/MultiCitySelector/MultiCitySelector';
import { WorkflowSection } from '../TravelPlannerWorkflow.d';
import { TravelPlannerWorkflowContext } from '../TravelPlannerWorkflow.state';

interface CitySelectionWorkflowProps {
  updateWorkflowSection: (newSection: WorkflowSection) => void;
}

const CitySelectionWorkflow: React.FC<CitySelectionWorkflowProps> = ({ updateWorkflowSection }) => {
  const [sameDepartureArrival, setSameDepartureArrival] = useState(true);

  const { state, dispatch } = useContext(TravelPlannerWorkflowContext);
  const { departureCities, visitingCities, arrivalCities } = state;
  const [advanceEnabled, setAdvanceEnabled] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const enableAdvance =
      departureCities.length >= 1 && visitingCities.length >= 1 && (sameDepartureArrival || arrivalCities.length >= 1);
    setAdvanceEnabled(enableAdvance);

    if (!enableAdvance) {
      updateWorkflowSection(WorkflowSection.CitySelection);
    }
  }, [departureCities, visitingCities, arrivalCities, sameDepartureArrival]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={styles.title}>Ótimo, então vamos lá!</Text>
        <Text style={styles.highlightedTitle}>
          Primeiramente, eu preciso saber quais são seus possíveis pontos de partida, quais cidades você deseja visitar
          e os possíveis destinos finais.
        </Text>
        <Text style={styles.inputLabel}>Possíveis pontos de partida:</Text>
        <MultiCitySelector
          setCities={cities => {
            dispatch({ type: 'setDepartureCities', cities: cities });
            sameDepartureArrival && dispatch({ type: 'setArrivalCities', cities: cities });
          }}
          cities={departureCities}
        />
        <Text style={styles.inputLabel}>Cidades para visitar:</Text>
        <MultiCitySelector
          onAddCity={city =>
            dispatch({
              type: 'setVisitingCities',
              cities: [...visitingCities, { city: city, minDays: 3, maxDays: 5 }]
            })
          }
          onRemoveCity={city =>
            dispatch({
              type: 'setVisitingCities',
              cities: state.visitingCities.filter(cityPeriod => cityPeriod.city.id !== city.id)
            })
          }
          cities={visitingCities.map(cityStayPeriod => cityStayPeriod.city)}
        />
        <Text style={styles.inputLabel}>Possíveis destinos finais:</Text>
        <MultiCitySelector
          disabled={sameDepartureArrival}
          setCities={cities => dispatch({ type: 'setArrivalCities', cities: cities })}
          cities={sameDepartureArrival ? [] : arrivalCities}
        />
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <Switch
            trackColor={{ false: '#8a8a8a', true: '#FC427B' }}
            thumbColor={'#f4f3f4'}
            onValueChange={value => {
              value
                ? dispatch({ type: 'setArrivalCities', cities: state.departureCities })
                : dispatch({ type: 'setArrivalCities', cities: [] });
              setSameDepartureArrival(value);
            }}
            value={sameDepartureArrival}
          />
          <Text style={{ flex: 1, marginLeft: 10, fontSize: 13 }}>
            Usar os mesmos pontos de partida e destinos finais (ida e volta)
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <View style={{ flex: 0.5 }}>
          <TouchableOpacity
            disabled={!advanceEnabled}
            style={{ paddingVertical: 20, alignItems: 'center' }}
            onPress={() => {
              navigation.navigate('StayPeriod');
            }}
          >
            <FontAwesome5 name="chevron-right" size={24} color={advanceEnabled ? '#FC427B' : '#ccc'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CitySelectionWorkflow;

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#6c757d'
  },
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
