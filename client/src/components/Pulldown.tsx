import { FC } from 'react';

const Pulldown: FC = (): JSX.Element => {
  const options: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "∞"];

  return (
    <select name="number" id="number">
      {options.map((option, key) => {
        return <option value={option} key={key + 1}>{option}</option>
      })}
    </select >
  );
}

export default Pulldown;
