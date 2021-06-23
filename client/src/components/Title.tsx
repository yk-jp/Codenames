import { FC } from 'react';
import { Link } from 'react-router-dom';
const Title: FC = (): JSX.Element => {
  return (
    <div className="d-flex justify-content-center mt-2">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h2 className="title">CODENAMES</h2>
      </Link>
    </div>
  );
}

export default Title;