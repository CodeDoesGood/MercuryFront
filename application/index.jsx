import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';

if (module.hot) {
  module.hot.accept(() => {
    render(<Root />, document.getElementById('app'));
  });
}

render(<Root />, document.getElementById('app'));
