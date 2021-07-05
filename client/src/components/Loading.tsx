import { FC } from 'react';

const Loading: FC = (): JSX.Element => {

  return (
    <div className="spinner-border text-success" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Loading;