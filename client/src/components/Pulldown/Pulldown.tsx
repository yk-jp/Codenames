import { forwardRef } from "react";
import PulldownStyle from './PulldownStyle.module.css';
const Pulldown = (props, ref): JSX.Element => {
  const options: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <select name="number" id="number" className="col-2 col-md-1 text-center p-0" ref={ref}>
      {options.map((option, key) => {
        return <option value={option} key={key + 1}>{option}</option>
      })}
    </select >
  );
}

export default forwardRef(Pulldown);
