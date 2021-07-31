import { FC, useContext, useEffect } from 'react';
import { Socket } from "socket.io-client";

//interfaces
import ITeam from '../interfaces/ITeam';
import ISpymaster from '../interfaces/ISpymaster';
import IOperative from '../interfaces/IOperative';
// useContext
import { GameDataContext } from '../context/GameDataContext';
import { SocketContext } from '../context/SocketContext';
const TeamTable: FC<any> = ({ style }): JSX.Element => {
  const roomId: string = window.location.pathname.split("/").pop() as string;
  const myId: string = sessionStorage.getItem("playerId") as string;
  const { tableData } = useContext(GameDataContext);
  const socket = useContext(SocketContext);
  const team: ITeam = style.team === "RED" ? tableData.table.redTeam : tableData.table.blueTeam;
  const kickPlayer = (socket: Socket, roomId: string, player: ISpymaster | IOperative) => {
    if (player.id === myId) return; //If the id clicked by player is own id, do nothing.
    if (window.confirm(`KICK ${player.name} OUT OF THIS GAME?`)) {
      socket.emit("leave-room", roomId, player.id);
    }
  };

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
            <tr className="text-center" key={index + 1}>
              <td id={`${member.id}`} className="delete" onClick={(e) => { kickPlayer(socket, roomId, member) }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x hover" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg></td>
              <td>{member.name}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}

export default TeamTable;