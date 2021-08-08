import { useContext } from 'react';
// config
import Term from '../../config/Term';
// css
import TeamTableStyle from './TeamTable.module.css';
// controller
import TeamTableController from './TeamTableController';
// interface
import ITeam from '../../interfaces/ITeam';
// useContext
import { GameDataContext } from '../../context/GameDataContext';

const TeamTable = ({ style }): JSX.Element => {

  const { tableData } = useContext(GameDataContext);
  const team: ITeam = style.team === Term.Team.RED ? tableData.table.redTeam : tableData.table.blueTeam;

  const { kickPlayer } = TeamTableController();

  return (
    <table id={style.id} className={style.table}>
      <thead className={TeamTableStyle.thead}>
        <tr className="text-center">
          <th colSpan={2}>{style.team}</th>
        </tr>
      </thead>
      <tbody>
        {team.teamMembers.map((member, index) => {
          return (
            <tr className={`text-center ${TeamTableStyle.tr}`} key={index + 1}>
              <td id={`${member.id}`} className={`${TeamTableStyle.delete} ${TeamTableStyle.td}`} onClick={() => { kickPlayer(member) }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x hover" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg></td>
              <td className={TeamTableStyle.name}>{member.name}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}

export default TeamTable;