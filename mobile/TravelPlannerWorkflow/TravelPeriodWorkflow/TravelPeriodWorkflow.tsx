import { AnemoiServices } from '@anemoi-ui/services';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import DateRangePicker from '../../shared/DateRangePicker/DateRangePicker';
import { TravelPlannerWorkflowContext, TravelPlannerWorkflowState } from '../TravelPlannerWorkflow.state';

const sendTravelPlanRequest = (state: TravelPlannerWorkflowState) =>
  AnemoiServices.calculateTravelPlan({
    currency: 'BRL',
    locale: 'pt-BR',
    departureCities: state.departureCities.map(city => city.id),
    arrivalCities: state.arrivalCities.map(city => city.id),
    visitingCities: state.visitingCities.map(cityStayPeriod => {
      return {
        cityId: cityStayPeriod.city.id,
        stayPeriod: [cityStayPeriod.minDays, cityStayPeriod.maxDays]
      };
    }),
    departureDateRange: {
      startDate: (state.departureDateRange.startDate as Date).toISOString(),
      endDate: (state.departureDateRange.endDate as Date).toISOString()
    },
    arrivalDateRange: {
      startDate: (state.arrivalDateRange.startDate as Date).toISOString(),
      endDate: (state.arrivalDateRange.endDate as Date).toISOString()
    },
    maxStopsPerRoute: 3,
    noOfTravelers: 1,
    preferredCriteria: 'price'
  });

const TravelPeriodWorkflow: React.FC = () => {
  const navigation = useNavigation();
  const { state, dispatch } = useContext(TravelPlannerWorkflowContext);

  const [isLoading, setIsLoading] = useState(false);
  const { departureDateRange, arrivalDateRange } = state;

  const isSearchable =
    departureDateRange.startDate &&
    departureDateRange.endDate &&
    arrivalDateRange.startDate &&
    arrivalDateRange.endDate;

  return (
    <View style={{ backgroundColor: 'white', flex: 1, padding: 10 }}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Anotado!</Text>
        <Text style={styles.highlightedTitle}>Para quando você está planejando esta viagem?</Text>
        <Text>Possivel periodo de partida:</Text>
        <DateRangePicker
          onSelectPeriod={({ startDate, endDate }) => {
            dispatch({
              type: 'setDateRanges',
              dateRanges: {
                departureDateRange: { startDate, endDate },
                arrivalDateRange
              }
            });
          }}
          range
          displayedStartDate={departureDateRange.startDate ?? undefined}
          displayedEndDate={departureDateRange.endDate ?? undefined}
        />
        <Text>Possivel periodo de chegada:</Text>
        <DateRangePicker
          onSelectPeriod={({ startDate, endDate }) => {
            dispatch({
              type: 'setDateRanges',
              dateRanges: {
                departureDateRange,
                arrivalDateRange: { startDate, endDate }
              }
            });
          }}
          range
          displayedStartDate={arrivalDateRange.startDate ?? undefined}
          displayedEndDate={arrivalDateRange.endDate ?? undefined}
        />
      </View>

      {/** TODO: separate this two buttos into a component */}
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ paddingVertical: 20, alignItems: 'center', flex: 1 }}
          onPress={() => {
            navigation.navigate('StayPeriod');
          }}
        >
          <FontAwesome5 name="chevron-left" size={24} color="#FC427B" />
        </TouchableOpacity>
        <View style={{ flex: 1, paddingVertical: 10, paddingLeft: 50, paddingRight: 30 }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              flex: 1,
              backgroundColor: isSearchable ? '#FC427B' : '#CCCCCC',
              borderRadius: 15,
              justifyContent: 'center'
            }}
            disabled={!isSearchable}
            onPress={() => {
              setIsLoading(true);
              sendTravelPlanRequest(state).then(result => {
                dispatch({ type: 'setTravelPlanResult', result });
                setIsLoading(false);
                navigation.navigate('TravelPlanResult');
              });
            }}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color="#FFF" />
            ) : (
              <FontAwesome5 name="search" size={24} color="#FFF" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
  }
});

export default TravelPeriodWorkflow;
