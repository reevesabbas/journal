import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';

describe('<App />', () => {
  it('Renders correctly', () => {
    renderer.create(<App />)
  });
});