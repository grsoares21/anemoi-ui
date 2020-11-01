import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent, waitForElement, wait } from '@testing-library/react';
import MultiCitySelector from './MultiCitySelector';
import LocationServices, { City } from './../../Services/LocationServices';
import i18n from '../../i18n/i18n';

const englishCities: City[] = [
  { name: 'Amsterdam', country: { name: 'Netherlands', id: 'net' }, id: 'ams' },
  { name: 'Paris', country: { name: 'France', id: 'fr' }, id: 'par' },
  { name: 'Panama City', country: { name: 'Panama', id: 'pn' }, id: 'pan' }
];

const portugueseCities: City[] = [
  { name: 'Amsterdã', country: { name: 'Holanda', id: 'net' }, id: 'ams' },
  { name: 'Paris', country: { name: 'França', id: 'fr' }, id: 'par' },
  { name: 'Cidade do Panama', country: { name: 'Panama', id: 'pn' }, id: 'pan' }
];

describe('MultiCitySelector component', () => {
  beforeEach(() => {
    jest.spyOn(LocationServices, 'searchCities').mockImplementation(
      (term: string, lang: string): Promise<City[]> => {
        switch (lang) {
          case 'EN':
            return Promise.resolve(englishCities.filter(city => city.name.indexOf(term) !== -1));
          default:
            return Promise.resolve(portugueseCities.filter(city => city.name.indexOf(term) !== -1));
        }
      }
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('renders without crashing with placeholder', () => {
    const placeHolderText = 'Test placeholder';
    const { asFragment, getByText } = render(<MultiCitySelector placeholder={placeHolderText} />);

    expect(asFragment()).toBeTruthy();
    expect(asFragment().querySelector('.MultiCitySelector')).toBeTruthy();
    expect(getByText(placeHolderText)).toBeTruthy();
  });

  it('renders without crashing in invalid state', () => {
    const invalidText = 'Invalid Text';
    const { asFragment, getByTestId } = render(<MultiCitySelector invalidMessage={invalidText} invalid />);

    expect(asFragment()).toBeTruthy();
    expect(asFragment().querySelector('.MultiCitySelector')).toBeTruthy();
    expect(getByTestId('invalid-message')).toHaveTextContent('');

    const input = document.querySelector('input') as Element;
    fireEvent.blur(input);

    expect(getByTestId('invalid-message')).toHaveTextContent(invalidText);
  });

  it('correctly fetches cities with i18next language', async () => {
    i18n.changeLanguage('EN');

    const { getByText, queryByText } = render(<MultiCitySelector />);

    const input = document.querySelector('input') as Element;
    fireEvent.change(input, { target: { value: 'Pa' } });

    await waitForElement(() => getByText('Panama City, Panama'));
    expect(getByText('Panama City, Panama')).toBeInTheDocument();
    expect(getByText('Paris, France')).toBeInTheDocument();
    expect(queryByText('Amsterdam, Netherlands')).not.toBeTruthy();
  });

  it('correctly selects cities', async () => {
    i18n.changeLanguage('PT');
    let selectedCities: City[] = [];
    const onAddCity = jest.fn((city: City) => {
      selectedCities.push(city);
    });
    const onChange = jest.fn();

    const { getByText, getByRole } = render(
      <MultiCitySelector value={selectedCities} onAddCity={onAddCity} onChange={onChange} />
    );

    fireEvent.input(getByRole('textbox'), { target: { value: 'Pa' } });

    await waitForElement(() => getByText('Paris, França'));
    expect(getByText('Paris, França')).toBeInTheDocument();
    getByText('Paris, França').click();
    expect(getByText('Paris')).toBeInTheDocument();
    await wait(() => expect(document.activeElement).toEqual(getByRole('textbox')));
    expect(onAddCity).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledTimes(1);
    // check that input keeps focused after selection
  });

  it('correctly removes cities', async () => {
    let selectedCities: City[] = [...portugueseCities];
    const onRemoveCity = jest.fn((_city: City) => {
      selectedCities.pop();
    });
    const onChange = jest.fn();

    const { asFragment, rerender } = render(
      <MultiCitySelector value={selectedCities} onRemoveCity={onRemoveCity} onChange={onChange} />
    );

    expect(asFragment().querySelectorAll('.MultiCitySelector__multi-value').length).toEqual(3);
    fireEvent.click(document.querySelector('.MultiCitySelector__multi-value__remove') as Element);
    expect(onRemoveCity).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledTimes(1);

    rerender(<MultiCitySelector value={selectedCities} />);
    expect(asFragment().querySelectorAll('.MultiCitySelector__multi-value').length).toEqual(2);
  });
});
