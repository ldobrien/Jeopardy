import { combineReducers } from "redux"
import finalJeopardyReducer from './finalJeopardyReducer'
import singleJeopardyReducer from "./singleJeopardyReducer";
import doubleJeopardyReducer from "./doubleJeopardyReducer";

const rootReducer = combineReducers({
    finalJeopardy: finalJeopardyReducer,
    singleJeopardy: singleJeopardyReducer,
    doubleJeopardy: doubleJeopardyReducer
})

export default rootReducer;