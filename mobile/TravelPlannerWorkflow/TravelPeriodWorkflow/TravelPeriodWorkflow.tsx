import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateRangePicker, { DateRangePickerState } from '../../shared/DateRangePicker/DateRangePicker';

const TravelPeriodWorkflow: React.FC = () => {
  const navigation = useNavigation();
  const [dates, setDates] = useState<DateRangePickerState>({
    endDate: moment(),
    startDate: moment()
  });

  return (
    <View style={{ backgroundColor: 'white', flex: 1, padding: 10 }}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Anotado!</Text>
        <Text style={styles.highlightedTitle}>Para quando você está planejando esta viagem?</Text>
        <DateRangePicker onChange={setDates} endDate={dates.endDate} startDate={dates.startDate} range>
          <Text>Click me!</Text>
        </DateRangePicker>
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
