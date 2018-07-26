export function frequencyReducer( state = { data: [],status: ''}, action){
    if(action.type === 'UPDATE_FREQUENCY'){
        return {
            data: action.data,
            status: action.status
        }
    }
    return state;
}