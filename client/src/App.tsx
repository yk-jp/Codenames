import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/App.css';
//components
import Home from './components/Home';
import Lobby from './components/Lobby';
import GameTable from './components/GameTable';

const App: FC = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/lobby" component={Lobby} />
          <Route exact path="/game" component={GameTable} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
