import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TravelPeriodWorkflow: React.FC = () => {
  return (
    <View style={{ backgroundColor: 'white', flex: 1, padding: 10 }}>
      <Text style={styles.title}>Anotado!</Text>
      <Text style={styles.highlightedTitle}>Para quando você está planejando esta viagem?</Text>
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
