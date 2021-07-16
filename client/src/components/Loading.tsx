import { FC } from 'react';

const Loading: FC = (): JSX.Element => {

  return (
    <div className="d-flex align-items-center">
      <strong>Loading...</strong>
      <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
    </div>
  )
}

export default Loading;