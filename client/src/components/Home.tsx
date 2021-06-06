import { FC } from 'react';
import { Link } from 'react-router-dom';
//components
import Title from './Title';
const Home: FC = (): JSX.Element => {
  return (
    <div className="container h-100">
      <Title />
      <div className="d-flex justify-content-center flex-column align-items-center h-75">

        <div>
          <Link to="/lobby">
            <button type="button" className="btn btn-outline-success">CREATE ROOM</button>
          </Link>
        </div>

        <div className="m-4">
          <h6 className="mt-2">OR</h6>
        </div>

        <div className="d-flex">
          <input type="text" className="h-100" placeholder="ENTER INVITE CODE"/>
          <button type="button" className="btn btn-outline-success">JOIN</button>
        </div>

      </div>
    </div>

  );
}

export default Home;