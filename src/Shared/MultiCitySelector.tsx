import './MultiCitySelector.scss';

import React from 'react';
import Async from 'react-select/async';
import debounce from 'lodash/debounce';

const locationsBaseUrl = 'https://api.skypicker.com/locations?locale=en-US&location_types=city&limit=10&';

// TODO: refactor this in a more appropriate way
// TODO: save selected values in state
const debouncedFetchCityOptions = debounce((searchTerm, callback) => {
  fetch(locationsBaseUrl + 'term=' + searchTerm)
    .then(result => result.json())
    .then(result => result.locations.map((loc: any) => {return {label: loc.name, value: loc.id}}))
    .then(locations => {callback(locations);debugger;})
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