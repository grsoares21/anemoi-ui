import './MultiCitySelector.scss';

import LocationServices, {City} from '../Services/LocationServices';

import React from 'react';
import Async from 'react-select/async';
import debounce from 'lodash/debounce';
import { ValueType } from 'react-select/src/types';

interface MultiCitySelectorOptions {
  label: string;
  value: string;
  data: City;
}

interface MultiCitySelectorProps {
  placeholder: string;
  onChange: (selectedCities: City[]) => void;
}

const debouncedFetchCityOptions = debounce((searchTerm, callback) => {
  LocationServices.searchCities(searchTerm)
    .then(cities =>
      cities.map(city => {
        return {label: `${city.name}, ${city.country.name}`, value: city.id, data: city}
      }))
    .then(cities => callback(cities))
    .catch((error) => {console.log(error)});
}, 500);

const fetchCityOptions = (searchTerm: string, callback: Function) => {
  if (!searchTerm) {
    return Promise.resolve({ options: [] });
  }
  debouncedFetchCityOptions(searchTerm, callback);
}

const MultiCitySelector: React.FC<MultiCitySelectorProps> = (props) => {
  return (
    <Async
      className='MultiCitySelector'
      classNamePrefix='MultiCitySelector'
      isMulti
      cacheOptions
      placeholder={props.placeholder}
      loadOptions={fetchCityOptions}
      components={{
        // hides the dropdown arroww on the right of the select
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null
      }}
      onChange={(value: ValueType<MultiCitySelectorOptions>) => {
        if(value === null) props.onChange([]);
        else props.onChange((value as MultiCitySelectorOptions[]).map(option => option.data));
      }}
      />
  );
}

export default MultiCitySelector;