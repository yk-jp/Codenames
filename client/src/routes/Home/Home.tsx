import { FC } from 'react';
import { Link } from 'react-router-dom';

const Home: FC = (): JSX.Element => {
  return (
    <div className="container h-100">
      <div className="d-flex justify-content-center flex-column align-items-center h-75">
        <div>
          <Link to="/form">
            <button type="button" className="btn btn-outline-success">CREATE ROOM</button>
          </Link>
        </div>
      </div>
    </div >
  );
}

export default Home;