const Loading = (): JSX.Element => {

  return (
    <div className="d-flex align-items-center m-5">
      <strong>Loading...</strong>
      <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
    </div>
  )
}

export default Loading;