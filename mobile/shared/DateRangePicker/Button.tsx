import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

interface ButtonProps {
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#bdbdbd',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginLeft: 10,
    marginBottom: 10
  },
  buttonText: {}
});

export default Button;
