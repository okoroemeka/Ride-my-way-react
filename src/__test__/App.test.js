import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
describe('App', () => {
  it('Runs and passes', () => {
    // expect(true).toBe(true);
    render(<App />);
  });
});
