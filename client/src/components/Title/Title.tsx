import { FC } from 'react';
import { Link } from 'react-router-dom';
import TitleStyle from "./Title.module.css";
const Title: FC = (): JSX.Element => {
  const confirmGoToHomePage = (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
    if (window.confirm("GO BACK TO THE HOME PAGE ?")) {}
    else e.preventDefault();
  };
  return (
    <div className="container-fluid justify-content-center mt-3">
      <div className="col-12 d-flex justify-content-center">
        <Link to="/" className={TitleStyle.textDecorationNone}>
          <h2 className={TitleStyle.title} onClick={(e) => confirmGoToHomePage(e)}>CODENAMES</h2>
        </Link>
      </div>
    </div>
  );
}

export default Title;