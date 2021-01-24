import React, { useRef } from 'react';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, Text, Image, useWindowDimensions } from 'react-native';
import Button from '../shared/Button/Button';
import ClassLinearGradient from '../shared/ClassLinearGradient';
import Animated, { Easing } from 'react-native-reanimated';

const AnimatedLinearGradient = Animated.createAnimatedComponent(ClassLinearGradient);

export default function WelcomePage() {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [welcomeCollapsed, setWelcomeCollapsed] = useState(false);

  const collapseAnim = useRef(new Animated.Value(height + insets.top)).current;
  const contentFadeAnim = useRef(new Animated.Value(1)).current;
  const anemoiTitleFadeAnim = useRef(new Animated.Value(0)).current;

  const collapseWelcomePage = () => {
    Animated.timing(collapseAnim, {
      toValue: 70,
      duration: 500,
      easing: Easing.linear
    }).start(() => {
      setWelcomeCollapsed(true);
      Animated.timing(anemoiTitleFadeAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear
      }).start();
    });

    Animated.timing(contentFadeAnim, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear
    }).start();
  };

  return (
    <AnimatedLinearGradient
      colors={['#1B9CFC', '#25CCF7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        height: collapseAnim,
        paddingTop: insets.top > 26 ? 5 : 0
      }}
    >
      {!welcomeCollapsed && (
        <Animated.View style={{ ...styles.container, opacity: contentFadeAnim }}>
          <Image style={{ width: 250, height: 250 }} source={require('../assets/compass.png')} />
          <Text style={styles.title}>
            Bem-vindo, eu sou o <Text style={styles.highlighted}>Anemoi.</Text>
          </Text>
          <Text style={styles.title}>
            Expert em <Text style={styles.highlighted}>viagens</Text> de avião multi-cidades.
          </Text>
          <Text style={styles.subtitle}>Posso ajudar a planejar a sua?</Text>
          <Button style={{ marginTop: 10 }} onPress={collapseWelcomePage}>
            Sim!
          </Button>
        </Animated.View>
      )}
      {welcomeCollapsed && (
        <Animated.Text style={{ ...styles.title, alignSelf: 'center', marginTop: 20, opacity: anemoiTitleFadeAnim }}>
          Anemoi
        </Animated.Text>
      )}
    </AnimatedLinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff'
  },
  subtitle: {
    fontSize: 35,
    color: '#fff'
  },
  highlighted: { color: '#182C61' },
  yesButton: {
    backgroundColor: '#FC427B',
    borderRadius: 8,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'flex-start'
  },
  yesText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25
  }
});
