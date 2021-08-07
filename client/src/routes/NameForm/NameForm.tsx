// css
import NameFormStyle from './NameForm.module.css';

// controller 
import NameFormController from './NameFormController';
const NameForm = (): JSX.Element => {

  const { name, joinRoom, errorMsg } = NameFormController();

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-center mt-5">
        {/* name */}
        <div className={`${NameFormStyle.name} d-flex flex-column`}>
          <form onSubmit={(e) => joinRoom(e)}>
            <div className="d-flex justify-content-center p-5">
              <input id="playerName" type="text" className="my-3 text-center" name="name" placeholder="ENTER YOUR NAME" ref={name} required />
            </div>
            {/* Join room */}
            <div className="d-flex justify-content-center">
              <button id="nameBtn" type="submit" className="btn btn-outline-success" >JOIN ROOM</button>
            </div>
          </form>
          <div className="d-flex justify-content-center mt-4">
            {errorMsg && <h5>{errorMsg}</h5>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NameForm;