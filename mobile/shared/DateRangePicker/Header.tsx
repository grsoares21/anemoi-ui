import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { Dimensions } from 'react-native';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

interface HeaderProps {
  index: number;
  day: string;
}

const Header: React.FC<HeaderProps> = ({ index, day }) => {
  return (
    <View key={'headers-' + index} style={styles.dayHeader}>
      <Text style={styles.dayHeaderText}>{day}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  dayHeader: {
    width: width * 0.09,
    height: height * 0.03,
    justifyContent: 'center'
  },
  dayHeaderText: {
    opacity: 0.6,
    textAlign: 'center'
  }
});
