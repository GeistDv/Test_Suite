import { StringLiteral } from "typescript";

//create type configuration
type TestCase = {
    StakingAmount : string;
    ValidatorNodes : number,
    ApiNodes : number,
    Threads : number,
    Loops : number,
    Chain : string,
    TestType : string,
    Position : number
}

//export 
export default TestCase;