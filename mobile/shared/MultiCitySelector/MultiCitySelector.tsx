import React, { useEffect, useState } from "react";
import { SafeAreaViewComponent, View, Text, ActivityIndicator } from "react-native";
import MultiSelector from "../MultiSelector/MultiSelector";
import LocationServices from "../services/LocationServices";
import debounce from "lodash.debounce";
import { FontAwesome } from "@expo/vector-icons";

const searchCities = (searchText: string) => {
  return LocationServices
    .searchCities(searchText, "PT-BR", 50)
    .then(results => results.map(({ id, name }) => ({ id, name })));
};

interface CityChipProps {
  name: string,
  onRemove: () => void
}

const CityChip: React.FC<CityChipProps> = ({ name, onRemove }) => (
  <View style={{ flexDirection: "row", backgroundColor: "#58B19F", borderRadius: 5, paddingVertical: 5, paddingHorizontal: 10, marginVertical: 3, marginRight: 5 }}>
    <Text style={{ color: "#FFF", fontWeight: "bold", marginRight: 5 }}>
      {name}
    </Text>
    <FontAwesome name="close" size={20} color="white" onPress={onRemove} />
  </View>
)

const MultiCitySelector: React.FC = () => {
  const [items, setItems] = useState<{ id: string, name: string }[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<{ id: string, name: string }[]>([]);
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

  const title = loadingCities ? <ActivityIndicator size="small" color="#1B9CFC" /> :
    (<Text>
      Selecione as cidades
    </Text>);
  return (
    <View>
      <MultiSelector
        showSearchBox
        onCancel={() => { }}
        onSelectItem={item => setSelectedItems([...selectedItems, item])}
        onRemoveItem={item => setSelectedItems([...selectedItems.filter(opt => opt.id !== item.id)])}
        onTextChange={debounce(setSearchText, 500)}
        onSubmit={() => { }}
        options={items}
        popupTitle={title}
        inputContent={
          <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%" }}>
            {selectedItems.map((item, i) => (
              <CityChip
                name={item.name}
                onRemove={
                  () =>
                    setSelectedItems(
                      [...selectedItems.filter(opt => opt.id !== item.id)]
                    )
                }
                key={i} />
            ))}
          </View>
        }
        searchPlaceHolderText="Search"
        selectedItems={selectedItems}
      />
    </View>
  )
}

export default MultiCitySelector;