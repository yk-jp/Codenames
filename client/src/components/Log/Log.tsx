// css
import LogStyle from './Log.module.css';
// controller
import LogController from './LogTextController';

const Log = (): JSX.Element => {
  const { logText } = LogController();

  return (
    <div id="log" className="form-group px-4 px-md-0 offset-md-0 col-12 col-md-12">
      <textarea className={`form-control ${LogStyle["resize-none"]} bg-white p-0 ${LogStyle.log} mt-md-5 text-success`} id="comment" value={logText} readOnly>
      </textarea>
    </div>
  );

};

export default Log;