import React, { useEffect, useState } from "react";
import { View, Text, RecyclerViewBackedScrollView } from "react-native";
import MultiSelector from "../MultiSelector/MultiSelector";


const possibleResults = [
  [{ id: "Porto Alegre", name: "Porto Alegre" }, { id: "Sao Paulo", name: "Sao Paulo" }],
  [{ id: "Sydney", name: "Sydney" }, { id: "Paris", name: "Paris" }],
  [{ id: "Ann Arbor", name: "Ann Arbor" }, { id: "Nova York", name: "Nova York" }]
]

let index = 0;

const getResults: () => Promise<{ id: string, name: string }[]> = () => {
  console.log("launched get results")
  return new Promise(resolve => {
    setTimeout(() => {
      let result = possibleResults[index++ % 3];
      console.log("resolved get results")
      console.log(result)
      resolve(result);
    }, 1000);
  })
}



const MultiCitySelector: React.FC = () => {
  const [items, setItems] = useState<{ id: string, name: string }[]>([]);
  const [search, setSearch] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<{ id: string, name: string }[]>([]);

  useEffect(() => {
    console.log("launched effect")
    if (search !== '') {
      console.log("effect launched search")
      getResults().then(results => setItems(results));
    }

  }, [search, getResults]);


  return (
    <View>
      <MultiSelector
        showSearchBox
        onCancel={() => { }}
        onSelectItem={item => setSelectedItems([...selectedItems, item])}
        onSubmit={() => { }}
        options={[{ id: "Porto Alegre", name: "Porto Alegre" }, { id: "Sao Paulo", name: "Sao Paulo" }]}
        popupTitle="lalala"
        title="lololo"
        searchPlaceHolderText="Search"
        selectedItems={selectedItems}
      />
    </View>
  )
}

export default MultiCitySelector;