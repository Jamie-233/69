import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line

const ReactRender = module.hot ? ReactDOM.render : ReactDOM.hydrate

// render hydrate
// ReactDOM.render(<App />, document.getElementById('root'));

const root = document.getElementById('root');

const render = (Component) => {
  ReactRender(
    <AppContainer>
      <Component />
    </AppContainer>,
    root,
  );
};

render(App);

// if(module.hot) {
//   console.log(module.hot);
//   module.hot.accept('./App.jsx', () => {
//     const NextApp = require('./App.jsx').default
//     // ReactDOM.hydrate(<NextApp />, root)
//     render(NextApp);
//   })
// }
