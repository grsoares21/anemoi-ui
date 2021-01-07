import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import { TouchableOpacity, View, Text, useWindowDimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { WorkflowSection } from '../TravelPlannerWorkflow.d';
import MaskedView from '@react-native-masked-view/masked-view';
import Animated from 'react-native-reanimated';

interface NavigationTabBarProps extends MaterialTopTabBarProps {
  currentWorkflowSection: WorkflowSection;
}

const NavigationTabBar: React.FC<NavigationTabBarProps> = ({
  state,
  descriptors,
  navigation,
  position,
  currentWorkflowSection
}) => {
  const routeIconMap: Record<string, string> = {
    CitySelection: 'map-signs',
    StayPeriod: 'sliders-h',
    TravelPeriod: 'calendar-alt',
    TravelPlanResult: 'map-marked-alt'
  };

  const { width } = useWindowDimensions();
  const offsetPercentage = Animated.interpolate(position, {
    inputRange: [0, 3],
    outputRange: [0, 0.75],
    extrapolate: Animated.Extrapolate.CLAMP
  });

  const value = Animated.multiply(offsetPercentage, width);

  return (
    <MaskedView
      style={{ flexDirection: 'row', padding: 15 }}
      maskElement={
        <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const isDisabled = index > currentWorkflowSection;

            return (
              <View key={index} style={{ flex: 1, alignItems: 'center', padding: 15 }}>
                <FontAwesome5
                  name={routeIconMap[route.name]}
                  color={isFocused ? '#FC427B' : isDisabled ? '#999' : '#7893d3'}
                  size={28}
                />
              </View>
            );
          })}
        </View>
      }
    >
      <View
        style={{
          width: (currentWorkflowSection + 1) * 25 + '%',
          height: 28,
          backgroundColor: '#ffbbcf'
        }}
      />
      <Animated.View
        style={{
          position: 'absolute',
          transform: [{ translateX: value }],
          width: '25%',
          height: 43,
          backgroundColor: '#FC427B',
          zIndex: 2
        }}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key
          });
        };

        const isDisabled = index >= currentWorkflowSection;
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            key={index}
            disabled={isDisabled}
            style={{
              opacity: 0,
              backgroundColor: 'white',
              height: 43,
              width: '25%',
              zIndex: 3,
              position: 'absolute',
              left: index * 25 + '%'
            }}
            activeOpacity={0.7}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}

      <View style={{ flex: 1, height: 28, backgroundColor: '#e1e1e1' }} />
    </MaskedView>
  );
};

export default NavigationTabBar;

/*<View style={{ position: 'absolute', width: '100%', height: 43, backgroundColor: 'transparent', zIndex: 3 }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            alert(route.name);
            /*const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key
            });
          };

          const isDisabled = index > currentWorkflowSection;

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              disabled={isDisabled}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                height: 28,
                backgroundColor: 'red',
                zIndex: 3,
                opacity: 1
              }}
            />
          );
        })}
      </View>
      */
