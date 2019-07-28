import './MultiCitySelector.scss';

import LocationServices, {City} from '../Services/LocationServices';

import React, { useRef } from 'react';
import Async from 'react-select/async';
import debounce from 'lodash/debounce';
import { ValueType } from 'react-select/src/types';

interface MultiCitySelectorOptions {
  label: string;
  value: string;
  data: City;
}

const debouncedFetchCityOptions = debounce((searchTerm: string, callback: (values: MultiCitySelectorOptions[]) => void) => {
  LocationServices.searchCities(searchTerm)
    .then(cities =>
      cities.map(city => {
        return {label: `${city.name}, ${city.country.name}`, value: city.id, data: city}
      }))
    .then(cities => callback(cities))
    .catch((error) => {console.log(error)});
}, 500);

const fetchCityOptions = (searchTerm: string, callback: (values: MultiCitySelectorOptions[]) => void) => {
  if (!searchTerm) {
    return Promise.resolve({ options: [] });
  }
  debouncedFetchCityOptions(searchTerm, callback);
}

interface MultiCitySelectorProps {
  placeholder: string;
  onChange: (selectedCities: City[]) => void;
  onConfirm: () => void;
}

const MultiCitySelector: React.FC<MultiCitySelectorProps> = (props) => {
  const selectElement = useRef<any>(null);
  // using any here because the type definition in @types/react-select
  // are not compatible with the library for the state manager

  return (
    <Async
      ref={selectElement}
      className='MultiCitySelector'
      classNamePrefix='MultiCitySelector'
      isMulti
      autoFocus
      onKeyDown={(e: KeyboardEventInit) => {
        let stateManager = selectElement.current && selectElement.current.select.state;
        if(stateManager != null && e.key === 'Enter') {
          if(!stateManager.menuIsOpen && stateManager.value && stateManager.value.length > 0) {
            // the confirm is executed when there is at least one value selected
            // and the user is not selecting any values
            props.onConfirm();
          }
        }
      }}
      cacheOptions
      placeholder={props.placeholder}
      loadOptions={fetchCityOptions}
      selectOptions={{ autoFocus: true }}
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