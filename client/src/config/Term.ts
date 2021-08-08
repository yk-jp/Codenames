// role
const SPYMASTER: string = "SPYMASTER";
const OPERATIVE: string = "OPERATIVE";

const Role = {
  SPYMASTER: SPYMASTER,
  OPERATIVE: OPERATIVE
}
// team
const RED: string = "RED";
const BLUE: string = "BLUE";

const Team = {
  RED: RED,
  BLUE: BLUE
}

// team phase
const GIVINGACLUE: string = "GIVING A CLUE";
const GUESSING: string = "GUESSING";
const WAITINGFORTURN: string = "WAITING FOR TURN";
const ENDGUESSING:string = "END GUESSING";

const TeamPhase = {
  GIVINGACLUE: GIVINGACLUE,
  GUESSING: GUESSING,
  WAITINGFORTURN: WAITINGFORTURN,
  ENDGUESSING:ENDGUESSING
}

// table phase
const REDTURN: string = "RED's TURN";
const BLUETURN: string = "BLUE's TURN";
const REDWON: string = "RED WON";
const BLUEWON: string = "BLUE WON";

const TablePhase = {
  REDTURN: REDTURN,
  BLUETURN: BLUETURN,
  REDWON: REDWON,
  BLUEWON: BLUEWON
}

// table game status

const START: string = "START";
const PLAYING: string = "PLAYING";
const END: string = "END";

const GameStatus = {
  START: START,
  PLAYING: PLAYING,
  END: END
}

// card team
const BYSTANDER: string = "BYSTANDER";
const ASSASIN: string = "ASSASIN";

const CardTeam:string[] = [RED, BLUE, BYSTANDER, ASSASIN];

const Term = {
  Role: Role,
  Team: Team,
  TeamPhase: TeamPhase,
  TablePhase: TablePhase,
  GameStatus: GameStatus,
  CardTeam:CardTeam
};

export default Term;