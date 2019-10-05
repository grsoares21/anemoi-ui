import './MultiCitySelector.scss';

import LocationServices, {City} from '../Services/LocationServices';

import React, { useRef, useState } from 'react';
import Async from 'react-select/async';
import debounce from 'lodash/debounce';
import { ValueType, ActionMeta } from 'react-select/src/types';
import { useTranslation } from 'react-i18next';

interface MultiCitySelectorOptions {
  label: string;
  value: string;
  data: City;
}

interface Action extends ActionMeta {
  option?: ValueType<MultiCitySelectorOptions>;
  removedValue?: ValueType<MultiCitySelectorOptions>;
}

interface MultiCitySelectorProps {
  inputRef?: any;
  // using any here because the type definition in @types/react-select
  // are not compatible with the library for the state manager
  placeholder: string;
  onChange?: (selectedCities: City[]) => void;
  onAddCity?: (selectedCity: City) => void;
  onRemoveCity?: (removedCity: City) => void;
  onClear?: () => void;
  onConfirm?: () => void;
  invalid?: boolean;
  invalidMessage?: string;
  value?: City[];
  invalidCities?: City[];
  disabled?: boolean;
}

const MultiCitySelector: React.FC<MultiCitySelectorProps> = (props) => {
  const ownRef = useRef<any>(null);
  // same reason as above
  const selectElement = props.inputRef ? props.inputRef : ownRef;

  const { i18n } = useTranslation();
  const [ touched, setTouched ] = useState(false);

  const debouncedFetchCityOptions = debounce((searchTerm: string, callback: (values: MultiCitySelectorOptions[]) => void) => {
    LocationServices.searchCities(searchTerm, i18n.language)
      .then(cities =>
        cities
          .filter(city => !props.invalidCities || !props.invalidCities.some(invalidCity => invalidCity.id === city.id))
          // filter invalid options out if there are any
          .map(city => {
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

  return (
    <>
      <Async
        ref={selectElement}
        className={`MultiCitySelector ${props.invalid && touched ? 'invalid' : ''}`}
        classNamePrefix='MultiCitySelector'
        isDisabled={props.disabled}
        onBlur={() => setTouched(true)}
        onFocus={() => setTouched(false)}
        isMulti
        value={props.value && props.value.map(city => {return { value: city.id, label: city.name, data: city}})}
        onKeyDown={(e: KeyboardEventInit) => {
          let stateManager = selectElement.current && selectElement.current.select.state;
          if(stateManager != null && e.key === 'Enter') {
            if(!stateManager.menuIsOpen && stateManager.value && stateManager.value.length > 0) {
              // the confirm is executed when there is at least one value selected
              // and the user is not selecting any values
              props.onConfirm && props.onConfirm();
            }
          }
        }}
        placeholder={props.placeholder}
        loadOptions={fetchCityOptions}
        components={{
          // hides the dropdown arrow on the right of the select
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null
        }}
        onChange={(value: ValueType<MultiCitySelectorOptions>, action: Action) => {
          switch(action.action) {
            case 'clear':
              props.onClear && props.onClear();
              break;
            case 'select-option':
              props.onAddCity && action.option && props.onAddCity((action.option as MultiCitySelectorOptions).data);
              break;
            case 'pop-value':
            case 'remove-value':
              props.onRemoveCity && action.removedValue && props.onRemoveCity((action.removedValue as MultiCitySelectorOptions).data);
              break;
            default:
              break;
          }

          value ?
            props.onChange && props.onChange((value as MultiCitySelectorOptions[]).map(option => option.data)) :
            props.onChange && props.onChange([]);
        }} />
        <span className="MultiCitySelector__InvalidMessage">
          {props.invalid && touched && props.invalidMessage ? props.invalidMessage : ''}
        </span>
      </>
  );
}

export default MultiCitySelector;