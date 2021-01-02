import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

const TravelPlanResult: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: 'white', flex: 1, padding: 10 }}>
      <View style={{ flex: 1 }}>{/* results here */}</View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 0.5 }}>
          <TouchableOpacity
            style={{ paddingVertical: 20, alignItems: 'center' }}
            onPress={() => {
              navigation.navigate('TravelPeriod');
            }}
          >
            <FontAwesome5 name="chevron-left" size={24} color="#FC427B" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TravelPlanResult;
