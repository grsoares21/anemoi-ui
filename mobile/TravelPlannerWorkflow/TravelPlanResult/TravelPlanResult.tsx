import { TravelPlanResult as ResultType } from '@anemoi-ui/services';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
import AirplaneTravelIcon from './AirplaneTravelIcon';
import Flag from 'react-native-flags';
import MaskedView from '@react-native-masked-view/masked-view';

const result: ResultType = {
  deepLink:
    'https://www.kiwi.com/deep?from=MXP&to=AMS&flightsId=07f010e8491b00005f14fc39_0%7C10e8145c491e0000ce561326_0%7C145c0b7749220000c847af1c_0%7C0b77091e49250000cfa254d4_0%7C091e2558492a00001e1aebb3_0&price=995.0&passengers=1&affilid=grsoaresanemoi&lang=br&currency=BRL&booking_token=BReYBiTl4lKZIXT7zFro8aY49k20u-n8yVlbandV6-0bi9a9vY4oKi8NIP36-doSZqaGH3rTMC0tQi1litXbbPVMUhpcmk6wOm-r9TgcK3ho_hRbzfo_H4hruyu9jqiPSXj10Dl06PpKtSIOgyrxSN_Rky7InhuVxgg5Ufkd4gjcUJ7tDJO14JYP-8jUbumasfRvITkZ9BHg2IXKWjopeF5axBmf2lS2ZEuDV8c1qpky7BEbRku40Rb-ozV8N8CKgjeKUiDZJOVlH8pfpv-wCoJyssSUep4fxAKKU-16sy7Wmp1Rx2yTxP05ZnWAtoacMC8a7CssCveudV0lCeK93OKXQw7gXP3GYySH5jaXf2UaZ97KNB4hfURXaW68YZz8DkEWgiu8xSJ68HlCBJbhOcsPF1ujwdyLUlRY1QW7w_ow3YHDQi1AsrCo4ptqJ-I8I1_VuxP68jAGp18R402TVERfkId1jEdCoXa9uvK3k0EOspisxbH6q7lOHAANQ-77tfQIyVvulfJt_vj1TtVjCn8rB4Q_VI1GsRqPfVCfXjtYI4uPobsKL3mwLXFIa2NWz1LGGukMdf8DhnQqbO9NYhlKw9KD-oSSn4aI1HZzhfNs5SMSGAx5z1z__1EPkGNq9cD-GfF-HhCKSauQU81NfQTzViMSoO-e3rGza7xPunJRhjXDqof82X0s5AYTrSYEo9DZz4Ush0R0RjkuED_jSI-_P2mHFlKO5q3Q1gJYJOEqGFHyGr3ExfLBTRZJCCllUzn7YlLJLi1x1vprq_oLq039CM2TOVWb-Xe1hdBjWQ18KEwaZS5zJ2H_lznP4teXL&type2=nomad',
  totalPrice: 995,
  routes: [
    {
      source: { cityName: 'Milão', countryName: 'Itália', countryCode: 'IT' },
      destination: { cityName: 'Amsterdão', countryName: 'Países Baixos', countryCode: 'NL' },
      startTime: '2021-03-29T16:10:00.000Z',
      endTime: '2021-03-29T18:05:00.000Z'
    },
    {
      source: { cityName: 'Amsterdão', countryName: 'Países Baixos', countryCode: 'NL' },
      destination: { cityName: 'Praga', countryName: 'República Checa', countryCode: 'CZ' },
      startTime: '2021-04-01T07:05:00.000Z',
      endTime: '2021-04-01T08:35:00.000Z'
    },
    {
      source: { cityName: 'Praga', countryName: 'República Checa', countryCode: 'CZ' },
      destination: { cityName: 'Budapeste', countryName: 'Hungria', countryCode: 'HU' },
      startTime: '2021-04-05T09:10:00.000Z',
      endTime: '2021-04-05T10:20:00.000Z'
    },
    {
      source: { cityName: 'Budapeste', countryName: 'Hungria', countryCode: 'HU' },
      destination: { cityName: 'Cidade de Bruxelas', countryName: 'Bélgica', countryCode: 'BE' },
      startTime: '2021-04-08T20:20:00.000Z',
      endTime: '2021-04-08T22:25:00.000Z'
    },
    {
      source: { cityName: 'Cidade de Bruxelas', countryName: 'Bélgica', countryCode: 'BE' },
      destination: { cityName: 'Milão', countryName: 'Itália', countryCode: 'IT' },
      startTime: '2021-04-13T11:45:00.000Z',
      endTime: '2021-04-13T13:15:00.000Z'
    }
  ]
};

const dateStringOptions = {
  weekday: 'short',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short'
};

const TravelPlanResult: React.FC = () => {
  moment.locale('pt');
  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: 'white', flex: 1, padding: 10 }}>
      <ScrollView style={{ flex: 1 }}>
        {result.routes.map(({ source, destination, startTime, endTime }, i) => (
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
                {moment(startTime).format('LLL')}
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
                {moment(endTime).format('LLL')}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <Text style={{ paddingVertical: 10, fontSize: 30, textAlign: 'center', fontWeight: '700', color: '#182c61' }}>
        Preço total: R$ {result.totalPrice.toFixed(2)}
      </Text>

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
