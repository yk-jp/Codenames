import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/App.css';
//components
import Home from './components/Home';
import Title from './components/Title';
import Game from './components/Game';

const App: FC = () => {
  return (
    <Router>
      <div className="App">
        <Title />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/game" component={Game} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
