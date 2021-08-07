import copyInputData from '../../hooks/copyInputData';
import InviteUrlStyle from './InviteUrl.module.css';
const InviteUrl = (): JSX.Element => {
  const url: string = window.location.href;

  return (
    <>
      <button onClick={() => copyInputData("link")} className={`btn ${InviteUrlStyle["btn-sm"]} btn-outline-success h-20px`}>COPY</button><input id="link" className="h-20px" type="url" value={url} readOnly />
    </>
  );
};

export default InviteUrl;