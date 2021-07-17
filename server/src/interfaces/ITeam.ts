import ISpymaster from "./ISpymaster";
import IOperative from "./IOperative";
export default interface ITeam { 
    name:string;
    spymaster:ISpymaster | null;
    operatives:IOperative[] | [];
    phase:string;
    teamMembers:(ISpymaster | IOperative)[];
    guessCount:string;
    cardsRemaining:string;
}