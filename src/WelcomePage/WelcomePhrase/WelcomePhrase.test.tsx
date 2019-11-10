import React from 'react';

import { render, cleanup } from '@testing-library/react';
import WelcomePhrase from './WelcomePhrase';

describe('WelcomePage component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders without crashing', () => {
    const { asFragment } = render(<WelcomePhrase />);

    expect(asFragment()).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
    expect(asFragment().querySelector('.WelcomePhrase')).toBeTruthy();
  });
});
