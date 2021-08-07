import { Link } from 'react-router-dom';

const Home = (): JSX.Element => {
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center flex-column align-items-center h-75">
        <div id="description">
          <div className="card text-left border border-success">
            <div className="card-body text-left">
              <h5 className="card-title my-3">HOW TO PLAY</h5>
              <h6 className="card-text my-3">1.CREATE A ROOM.</h6>
              <h6 className="card-text my-3">2.INVITE YOUR FRIENDS SHARING THE ROOM URL.</h6>
              <h6 className="card-text my-3">3.START GAME.</h6>
              <h6 className="card-text my-3">※NUMBER OF PLAYERS:  4～10</h6>
              <h6 className="card-text my-3">※IF YOU WANT TO KICK A PLAYER OUT OF THE ROOM, HIT THE CROSS BUTTON NEARBY TEAM TABLES.</h6>
              <h6 className="card-text my-3">※YOU CAN PLAY IT IN THE SAME ROOM FOR 6 HOURS AT MAXIMUM.</h6>
              <div id="createRoom" className="my-5 d-flex justify-content-center">
                <Link to="/form">
                  <button type="button" className="btn btn-outline-success">CREATE ROOM</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Home;