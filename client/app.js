import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { AppContainer } from 'react-hot-loader';

let canUseDOM = !!(
  (typeof window !== 'undefined' &&
  window.document && window.document.createElement)
);

const renderMethod = !!module.hot ? ReactDOM.render : ReactDOM.hydrate
console.log(renderMethod);
// const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

// render hydrate
// ReactDOM.render(<App />, document.getElementById('root'));

const root = document.getElementById('root');

const render = Component => {
  renderMethod(
    <AppContainer>
      <Component />
    </AppContainer>,
    root,
  );
};

render(App);

if(module.hot) {
  module.hot.accept('./App.jsx', () => {
    const NextApp = require('./App.jsx').default
    // ReactDOM.hydrate(<NextApp />, root)
    render(NextApp);
  })
}
