import EndGuessController from "./EndGuessController";
const EndGuess = (): JSX.Element => {
  
  const endGuessController = EndGuessController();

  return (
    <div className="d-flex justify-content-center mt-3">
      <button type="button" className="btn btn-outline-success" onClick={endGuessController}>END GUESS</button>
    </div>
  );
};

export default EndGuess;