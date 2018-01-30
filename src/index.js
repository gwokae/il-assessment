import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

const App = () => (
  <h1>Assessment</h1>
);

ReactDOM.render(<App />, document.getElementById('app'));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
