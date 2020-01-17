import React from 'react';
import './Shared/Mocks/SharedMocks';
import App from './App';

import { render, cleanup } from '@testing-library/react';

describe('Main App component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders without crashing', () => {
    const { asFragment, getByTestId } = render(<App />);
    expect(asFragment()).toBeTruthy();
    expect(getByTestId('app-container')).toBeTruthy();
  });
});
