import './MultiCitySelector.scss';

import LocationServices from '../Services/LocationServices';

import React from 'react';
import Async from 'react-select/async';
import debounce from 'lodash/debounce';

// TODO: save selected values in state
const debouncedFetchCityOptions = debounce((searchTerm, callback) => {
  LocationServices.searchCities(searchTerm)
    .then(cities =>
      cities.map(city => {
        return {label: `${city.name}, ${city.country.name}`, value: city}
      }))
    .then(cities => callback(cities))
    .catch((error) => {console.log(error)});
}, 500);

const searchCityOptions = (searchTerm: string, callback: Function) => {
  if (!searchTerm) {
    return Promise.resolve({ options: [] });
  }
  debouncedFetchCityOptions(searchTerm, callback);
}

interface MultiCitySelectorProps {
  placeholder: string
}

const MultiCitySelector: React.FC<MultiCitySelectorProps> = (props) => {
  return (
    <Async
      className='MultiCitySelector'
      classNamePrefix='MultiCitySelector'
      isMulti
      cacheOptions
      placeholder={props.placeholder}
      loadOptions={searchCityOptions}
      components={{
        // hides the dropdown arroww on the right of the select
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null
      }}
      />
  );
}

export default MultiCitySelector;