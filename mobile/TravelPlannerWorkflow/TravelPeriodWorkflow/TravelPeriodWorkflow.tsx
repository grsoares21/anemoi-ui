import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateRangePicker from '../../shared/DateRangePicker/DateRangePicker';
import { TravelPlannerWorkflowContext } from '../TravelPlannerWorkflow.state';

const TravelPeriodWorkflow: React.FC = () => {
  const navigation = useNavigation();
  const {
    state: { departureDateRange, arrivalDateRange },
    dispatch
  } = useContext(TravelPlannerWorkflowContext);

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
                departureDateRange: { startDate: startDate.toDate(), endDate: endDate.toDate() },
                arrivalDateRange
              }
            });
          }}
          range
          displayedStartDate={departureDateRange.startDate ? moment(departureDateRange.startDate) : undefined}
          displayedEndDate={departureDateRange.endDate ? moment(departureDateRange.endDate) : undefined}
        />
        <Text>Possivel periodo de chegada:</Text>
        <DateRangePicker
          onSelectPeriod={({ startDate, endDate }) => {
            dispatch({
              type: 'setDateRanges',
              dateRanges: {
                departureDateRange,
                arrivalDateRange: { startDate: startDate.toDate(), endDate: endDate.toDate() }
              }
            });
          }}
          range
          displayedStartDate={arrivalDateRange.startDate ? moment(arrivalDateRange.startDate) : undefined}
          displayedEndDate={arrivalDateRange.endDate ? moment(arrivalDateRange.endDate) : undefined}
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
        <TouchableOpacity
          style={{ paddingVertical: 20, alignItems: 'center', flex: 1 }}
          onPress={() => {
            navigation.navigate('TravelPlanResult');
          }}
        >
          <FontAwesome5 name="chevron-right" size={24} color="#FC427B" />
        </TouchableOpacity>
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
