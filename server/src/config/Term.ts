// role
const SPYMASTER: string = "SPYMASTER";
const OPERATIVE: string = "OPERATIVE";

// team
const RED: string = "RED";
const BLUE: string = "BLUE";

// team phase
const GIVINGACLUE: string = "GIVING A CLUE";
const GUESSING: string = "GUESSING";
const WAITINGFORTURN: string = "WAITING FOR TURN";

// role
const Role = {
  SPYMASTER: SPYMASTER,
  OPERATIVE: OPERATIVE
}

// team
const Team = {
  RED: RED,
  BLUE: BLUE
}

// team phase
const TeamPhase = {
  GIVINGACLUE: GIVINGACLUE,
  GUESSING: GUESSING,
  WAITINGFORTURN: WAITINGFORTURN
}

const Term = {
  Role: Role,
  Team: Team,
  TeamPhase: TeamPhase
};

export default Term;