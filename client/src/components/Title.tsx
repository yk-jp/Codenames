import { FC } from 'react';
import { Link } from 'react-router-dom';
const Title: FC = (): JSX.Element => {
  return (
    <div className="container-fluid justify-content-center mt-3">
      <div className="col-12 d-flex justify-content-center">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h2 className="title">CODENAMES</h2>
        </Link>
      </div>
    </div>
  );
}

export default Title;