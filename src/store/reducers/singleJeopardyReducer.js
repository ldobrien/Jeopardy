import initialState from './initialState'

const singleJeopardyReducer = (state = initialState.singleJeopardy, action) => {
    switch(action.type){
        default:
            return state;
    }
}

export default singleJeopardyReducer;