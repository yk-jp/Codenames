import { FC } from 'react';
import Pulldown from './Pulldown';

const Clue: FC = (): JSX.Element => {

  return (
    <div className="container mt-3">
      <div className="row flex-nowrap justify-content-center">
        <input className="col-6 col-md-4" type="text" placeholder="ENTER A WORD" />
        <Pulldown />
        <button type="button" className="btn btn-outline-success col-4 col-md-2 text-nowrap">SEND</button>
      </div>
    </div>
  );
};


export default Clue;