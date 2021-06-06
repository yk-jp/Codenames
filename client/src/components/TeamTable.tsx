import { FC } from 'react';

//interfaces
import ITable from '../interfaces/ITable';

const TeamTable: FC<ITable> = (table): JSX.Element => {
  return (
    <div className="col">
      <table id={table["table"].id} className={table["table"].style}>
        <thead>
          <tr className="text-center">
            <th colSpan={2}>{table["table"].team}</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td>3</td>
            <td>Larry</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TeamTable;