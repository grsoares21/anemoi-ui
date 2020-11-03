import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image, useWindowDimensions, Animated } from 'react-native';
import ClassLinearGradient from './shared/ClassLinearGradient';

const AnimatedLinearGradient = Animated.createAnimatedComponent(ClassLinearGradient);

export default function App() {
  const { height } = useWindowDimensions();
  //const [welcomeCollapsed, setWelcomeCollapsed] = useState(false);

  const collapseAnim = useRef(new Animated.Value(height)).current;

  return (
    <AnimatedLinearGradient
      colors={['#1B9CFC', '#25CCF7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        height: collapseAnim
      }}
    >
      <View style={styles.container}>
        <Image
          style={{ width: 250, height: 250 }}
          source={require('./assets/compass.png')} />
        <Text
          style={styles.title}>
          Bem-vindo, eu sou o <Text style={styles.highlighted}>Anemoi.</Text>
        </Text>
        <Text
          style={styles.title}>
          Expert em <Text style={styles.highlighted}>viagens</Text> de avião multi-cidades.
        </Text>
        <Text
          style={styles.subtitle}>
          Posso ajudar a planejar a sua?
        </Text>
        <StatusBar style="auto" />

        <TouchableOpacity style={styles.yesButton} onPress={() => Animated.timing(
          collapseAnim,
          {
            toValue: 75,
            useNativeDriver: false,
            duration: 500
          }
        ).start()}>
          <Text style={styles.yesText}>Sim!</Text>
        </TouchableOpacity>
      </View>
    </AnimatedLinearGradient >
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
    fontWeight: "bold",
    color: '#fff',
  },
  subtitle: {
    fontSize: 35,
    color: '#fff',
  },
  highlighted: { color: '#182C61' },
  yesButton: {
    backgroundColor: '#FC427B',
    borderRadius: 8,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: "flex-start"
  },
  yesText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25
  }
});
