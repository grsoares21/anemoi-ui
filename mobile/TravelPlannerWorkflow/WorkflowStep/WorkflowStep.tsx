import React, { useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';

const animationConfig = {
  duration: 300,
  useNativeDriver: false,
  easing: Easing.linear
};

const WorkflowStep: React.FC = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const marginAnim = useRef(new Animated.Value(-10)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, { ...animationConfig, toValue: 1 }).start();
    Animated.timing(marginAnim, { ...animationConfig, toValue: 0 }).start();
  }, [fadeAnim])

  return (
    <Animated.View
      style={{
        ...styles.viewStyle,
        opacity: fadeAnim,
        marginTop: marginAnim
      }}
    >
      {props.children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    padding: 10
  }
})

export default WorkflowStep;