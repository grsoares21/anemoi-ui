import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import WelcomePage from './WelcomePage';

describe('WelcomePage component', () => {
  jest.mock('./AnemoiTitle/AnemoiTitle', () => ({
    default: (props: { isVisible: boolean }) => props.isVisible && <span data-testid="anemoi-title"></span>
  }));

  afterEach(() => {
    cleanup();
  });

  it('renders without crashing', () => {
    const { asFragment } = render(<WelcomePage collapseCallback={() => {}} />);

    expect(asFragment()).toBeTruthy();
    expect(asFragment().querySelector('.WelcomePage')).toBeTruthy();
  });

  it('collapses when clicks the YES button', async () => {
    const gtag = jest.fn();
    const Cookiebot = { consent: { statistics: true } };
    (global as any).gtag = gtag;
    (global as any).Cookiebot = Cookiebot;
    const collapseCallback = jest.fn();
    const { getByTestId, queryByTestId, findByTestId } = render(<WelcomePage collapseCallback={collapseCallback} />);

    expect(getByTestId('page-content')).toBeVisible();
    expect(queryByTestId('anemoi-title')).not.toBeTruthy();

    getByTestId('yes-button').click();

    await findByTestId('anemoi-title');
    expect(getByTestId('page-content')).not.toBeVisible();
    expect(collapseCallback).toHaveBeenCalledTimes(1);
    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag).toHaveBeenCalledWith('event', 'StartPlannerWorkflow', expect.anything());
  });
});
