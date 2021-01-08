import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

// TODO: check if it can be replaced by useDimensions hook
import { Dimensions } from 'react-native';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

interface DayProps {
  index?: number;
  selected?: boolean;
  disabled?: boolean;
  select?: () => void;
  empty?: boolean;
}

const Day: React.FC<DayProps> = ({ index, selected, disabled, select, empty }) => {
  const selectThis = () => {
    if (!disabled && select) {
      select();
    }
  };

  return (
    <TouchableOpacity key={'day-' + index} onPress={empty ? undefined : selectThis}>
      <View style={styles.day}>
        <View
          style={{
            ...styles.day,
            ...(selected && styles.selected),
            ...(disabled && styles.disabled)
          }}
        >
          <Text
            style={{
              ...styles.dayText,
              ...(selected && styles.selectedText),
              ...(disabled && styles.disabledText)
            }}
          >
            {index}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Day;

const styles = StyleSheet.create({
  day: {
    width: width * 0.09,
    height: height * 0.065,
    justifyContent: 'center'
  },
  dayText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black'
  },
  selected: {
    backgroundColor: '#3b83f7',
    height: '80%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedText: {
    color: 'white'
  },
  disabledText: {
    opacity: 0.3
  },
  disabled: {}
});
