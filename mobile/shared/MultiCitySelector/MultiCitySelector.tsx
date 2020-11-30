import React, { useEffect, useState } from 'react';
import {
  SafeAreaViewComponent,
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import MultiSelector from '../MultiSelector/MultiSelector';
import { City, LocationServices } from '@anemoi-ui/services';
import debounce from 'lodash.debounce';
import { FontAwesome } from '@expo/vector-icons';

const searchCities = (searchText: string) => {
  return LocationServices.searchCities(searchText, 'PT-BR', 50);
};

interface CityChipProps {
  name: string;
  onRemove: () => void;
}

const CityChip: React.FC<CityChipProps> = ({ name, onRemove }) => (
  <View
    style={{
      flexDirection: 'row',
      backgroundColor: '#58B19F',
      borderRadius: 5,
      paddingVertical: 5,
      paddingHorizontal: 10,
      marginVertical: 3,
      marginRight: 5
    }}
  >
    <Text style={{ color: '#FFF', fontWeight: 'bold', marginRight: 5 }}>
      {name}
    </Text>
    <FontAwesome name="close" size={20} color="white" onPress={onRemove} />
  </View>
);

interface MultiCitySelectorProps {
  setCities: (cities: City[]) => void;
  cities: City[];
  disabled?: boolean;
}

const MultiCitySelector: React.FC<MultiCitySelectorProps> = ({
  setCities,
  cities,
  disabled
}) => {
  const [items, setItems] = useState<City[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    setItems([]);
    if (searchText !== '') {
      setLoadingCities(true);
      searchCities(searchText).then(results => {
        setLoadingCities(false);
        setItems(results);
      });
    }
  }, [searchText, searchCities]);

  const title = loadingCities ? (
    <ActivityIndicator size="small" color="#1B9CFC" />
  ) : (
    <Text>Selecione as cidades</Text>
  );
  return (
    <View>
      <MultiSelector
        disabled={disabled}
        showSearchBox
        onSelectItem={item =>
          setCities([...cities, items.find(it => it.id === item.id) as City])
        }
        onRemoveItem={item =>
          setCities([...cities.filter(opt => opt.id !== item.id)])
        }
        onTextChange={debounce(setSearchText, 500)}
        onSubmit={() => {}}
        options={items}
        popupTitle={title}
        inputContent={
          <View
            style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}
          >
            {cities.map((item, i) => (
              <CityChip
                name={item.name}
                onRemove={() =>
                  setCities([...cities.filter(opt => opt.id !== item.id)])
                }
                key={i}
              />
            ))}
          </View>
        }
        searchPlaceHolderText="Search"
        selectedItems={cities}
      />
    </View>
  );
};

export default MultiCitySelector;
