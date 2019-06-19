import React from 'react';
import { render as rtlRender, RenderResult } from 'react-testing-library';

import Dashboard from './Dashboard';
import { BrowserRouter } from 'react-router-dom';

const render = (ui: React.ReactElement<any>, options?: any): RenderResult => {
  return rtlRender(<BrowserRouter>{ui}</BrowserRouter>, options);
};

it('can render dashboard component', () => {
  const { getByTestId } = render(<Dashboard />);
  expect(getByTestId('dashboard')).toMatchSnapshot();
});
