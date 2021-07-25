import { createContext } from 'react';
import { useHistory } from 'react-router';

export const LocationContext = createContext<any>(undefined);

export const LocationHistoryProvider = ({ children }): JSX.Element => {
  const history = useHistory();

  return (
    <LocationContext.Provider value={history}>
      {children}
    </LocationContext.Provider>
  );
}