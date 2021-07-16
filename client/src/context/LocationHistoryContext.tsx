import { createContext } from 'react';
import { useHistory } from 'react-router';
import ILocationHistory from '../interfaces/ILocationHistory'; // fix this later

export const LocationContext = createContext<any>(undefined);

export const LocationHistoryProvider = ({ children }): JSX.Element => {
  const history = useHistory();

  return (
    <LocationContext.Provider value={{ history: history }}>
      {children}
    </LocationContext.Provider>
  );
}