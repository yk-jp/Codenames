import ITable from '../interfaces/ITable';

export const blueTeamStyle: ITable["table"] = {
  id: "blue",
  style: "table text-primary border border-primary",
  team: "BLUE"
};

export const redTeamStyle: ITable["table"] = {
  id: "red",
  style: "table text-danger border border-danger",
  team: "RED"
};