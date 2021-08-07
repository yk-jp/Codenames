// component
import Pulldown from '../Pulldown/Pulldown';
// controller 
import ClueController from './ClueController';

const Clue = (): JSX.Element => {
  const { word, number, clueController } = ClueController();
  return (
    <div className="container mt-3">
      <div className="row flex-nowrap justify-content-center">
        <input ref={word} className="col-6 col-md-4" type="text" placeholder="ENTER A WORD" />
        <Pulldown ref={number} />
        <button type="button" className="btn btn-outline-success col-4 col-md-2 text-nowrap" onClick={(e) => clueController(e)}>SEND</button>
      </div>
    </div>
  );
};

export default Clue;