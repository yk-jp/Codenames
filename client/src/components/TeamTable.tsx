import { FC, useContext } from 'react';
//interfaces
import ITeam from '../interfaces/ITeam';
// useContext
import { GameDataContext } from '../context/GameDataContext';

const TeamTable: FC<any> = ({style}): JSX.Element => {
  const { tableData } = useContext(GameDataContext);
  const team: ITeam = style.team === "RED" ? tableData.table.redTeam : tableData.table.blueTeam;
  // console.log(team);
  return (
    <table id={style.id} className={style.table}>
      <thead>
        <tr className="text-center">
          <th colSpan={2}>{style.team}</th>
        </tr>
      </thead>
      <tbody>
        {team.teamMembers.map((member, index) => {
          return (
            <tr className="text-center" key={index+1}>
              <td>{index + 1}</td>
              <td>{member.name}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}

export default TeamTable;