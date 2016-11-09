import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './css/foundation.min.css';
import './css/index.css';

import App from './App';
import NotFound from './components/NotFound';
import Provider from './components/Provider';

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern='/' component={App} />
        <Match pattern='/martian/:martianName' component={App} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

ReactDOM.render(<Provider><Root/></Provider>, document.getElementById('root'));
