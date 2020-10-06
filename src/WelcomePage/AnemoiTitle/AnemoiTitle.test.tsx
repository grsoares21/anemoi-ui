import React from 'react';
import AnemoiTitle from './AnemoiTitle';

import { render, cleanup } from '@testing-library/react';

describe('AnemoiTitle component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders without crashing with visible = true', () => {
    const { asFragment, getByTestId } = render(<AnemoiTitle isVisible={true} />);
    expect(asFragment()).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId('anemoi-title')).toBeTruthy();
  });

  it('renders without crashing with visible = false', () => {
    const { asFragment, queryByTestId } = render(<AnemoiTitle isVisible={false} />);
    expect(asFragment()).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
    expect(queryByTestId('anemoi-title')).not.toBeTruthy();
  });
});
