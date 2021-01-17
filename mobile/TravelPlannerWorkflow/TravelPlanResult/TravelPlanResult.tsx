import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import React, { useContext } from 'react';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
import AirplaneTravelIcon from './AirplaneTravelIcon';
import { TravelPlannerWorkflowContext } from '../TravelPlannerWorkflow.state';
import * as Linking from 'expo-linking';
import { format } from 'date-fns';

const TravelPlanResult: React.FC = () => {
  const navigation = useNavigation();
  const {
    state: { travelPlanResult }
  } = useContext(TravelPlannerWorkflowContext);

  return (
    <View style={{ backgroundColor: 'white', flex: 1, padding: 10 }}>
      <ScrollView style={{ flex: 1 }}>
        {travelPlanResult?.routes.map(({ source, destination, startTime, endTime }, i) => (
          <View
            key={i}
            style={{
              backgroundColor: '#f8f9fa',
              margin: 10,
              padding: 10,
              borderRadius: 5,
              minHeight: 100,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <View style={{ width: '35%', paddingHorizontal: 5 }}>
              {/* <MaskedView
                style={{ width: '100%' }}
                maskElement={
                  <View
                    style={{
                      // Transparent background because mask is based off alpha channel.
                      backgroundColor: 'black',
                      flex: 1,
                      height: 20,
                      width: 20,
                      borderRadius: 100
                    }}
                  ></View>
                }
              >
                <Flag code={source.countryCode} size={64} type="flat" />
              </MaskedView> */}
              <Text style={{ textAlign: 'center', color: '#182c61', fontWeight: '700' }}>
                {source.cityName}, {source.countryName}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  textAlign: 'center',
                  color: '#58b19f',
                  fontWeight: '700'
                }}
              >
                {format(new Date(startTime), 'Pp')}
              </Text>
            </View>
            <AirplaneTravelIcon width="30%" height="80%" />
            <View style={{ width: '35%', paddingHorizontal: 5 }}>
              {/* <View>
                <View
                  style={{
                    backgroundColor: 'black',
                    flex: 1,
                    height: 20,
                    width: 20,
                    borderRadius: 100
                  }}
                ></View>
              </View> */}
              <Text
                style={{
                  textAlign: 'center',
                  color: '#182c61',
                  fontWeight: '700'
                }}
              >
                {destination.cityName}, {destination.countryName}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  textAlign: 'center',
                  color: '#58b19f',
                  fontWeight: '700'
                }}
              >
                {format(new Date(endTime), 'Pp')}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <Text style={{ paddingVertical: 10, fontSize: 30, textAlign: 'center', fontWeight: '700', color: '#182c61' }}>
        Preço total: R$ {travelPlanResult?.totalPrice.toFixed(2)}
      </Text>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ paddingVertical: 20, alignItems: 'center', flex: 1 }}
          onPress={() => {
            navigation.navigate('TravelPeriod');
          }}
        >
          <FontAwesome5 name="chevron-left" size={24} color="#FC427B" />
        </TouchableOpacity>
        <View style={{ flex: 1, paddingVertical: 10, paddingLeft: 50, paddingRight: 30 }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              flex: 1,
              backgroundColor: '#58b19f',
              borderRadius: 15,
              justifyContent: 'center'
            }}
            onPress={() => {
              travelPlanResult && Linking.openURL(travelPlanResult.deepLink);
            }}
          >
            <Entypo name="aircraft" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TravelPlanResult;
