import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
//components
import Home from './routes/Home/Home';
import Title from './components/Title/Title';
import Game from './routes/Game/Game';
import NameForm from './routes/NameForm/NameForm';
import NotFound from './components/NotFound/NotFound';
// context
import { LocationHistoryProvider } from './context/LocationHistoryContext';
import { SocketProvider } from './context/SocketContext';
import { GameDataProvider } from './context/GameDataContext';
const App = () :JSX.Element=> {
  return (
    <Router>
      <div className="App">
        <Title />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/form">
            <LocationHistoryProvider>
              <NameForm />
            </LocationHistoryProvider>
          </Route>
          <Route path="/game/:roomId">
            <LocationHistoryProvider>
              <GameDataProvider>
                <SocketProvider>
                  <Game />
                </SocketProvider>
              </GameDataProvider>
            </LocationHistoryProvider>
          </Route>
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router >
  );
}

export default App;
