import { FC } from 'react';
import copyInputData from '../hooks/copyInputData';
const InviteUrl: FC = (): JSX.Element => {
  const url: string = window.location.href;

  return (
    <>
      <button onClick={() => copyInputData("link")} className="btn btn-sm btn-outline-success h-20px">COPY</button><input id="link" className="h-20px" type="url" value={url} readOnly />
    </>
  );
};

export default InviteUrl;