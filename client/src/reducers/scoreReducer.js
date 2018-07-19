export function scoreReducer( state = { score : ''},action){
    if(action.type === 'UPDATE_SCORE'){
        return {
            score: action.score
        }
    }
    return state;
}