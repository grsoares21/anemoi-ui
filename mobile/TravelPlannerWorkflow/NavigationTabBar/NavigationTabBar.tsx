import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { WorkflowSection } from '../TravelPlannerWorkflow.d';

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

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = route.name;

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

        const inputRange = state.routes.map((_, i) => i);
        /*const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0))
        });*/
        const isDisabled = index > currentWorkflowSection;

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            disabled={isDisabled}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: 'center', padding: 10 }}
          >
            <FontAwesome5
              name={routeIconMap[route.name]}
              color={isFocused ? '#FC427B' : isDisabled ? '#AAA' : '#333'}
              size={28}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default NavigationTabBar;
