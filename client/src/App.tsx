import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/App.css';
//components
import Home from './components/Home';
import Title from './components/Title';
import Game from './components/Game';
import NameForm from './components/NameForm';
import NotFound from './components/NotFound';
// context
import { LocationHistoryProvider } from './context/LocationHistoryContext';
import { SocketProvider } from './context/SocketContext';
import { GameDataProvider } from './context/GameDataContext';
const App: FC = () => {
  return (
    <Router>
      <div className="App">
        <Title />
        <SocketProvider>
          <GameDataProvider>
            <LocationHistoryProvider>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/form" component={NameForm} />
                <Route path="/game/:roomId" component={Game} />
                <Route path="*" component={NotFound} />
              </Switch>
            </LocationHistoryProvider>
          </GameDataProvider>
        </SocketProvider>
      </div>
    </Router>
  );
}

export default App;
