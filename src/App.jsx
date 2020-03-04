import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import store from './store';
import HeroList from './pages/Hero/List/List';
import Hero from './pages/Hero';
import AddHero from './pages/Hero/AddHero';
import Routes from './config/routes';

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path={Routes.HOME} exact><HeroList /></Route>
        <Route path={Routes.HERO_ID}><Hero /></Route>
        <Route path={Routes.ADD_HERO}><AddHero /></Route>
        <Route path={Routes.ANY}>
          <div>404 Not Found</div>
        </Route>
      </Switch>
    </Router>
  </Provider>
);

export default App;
