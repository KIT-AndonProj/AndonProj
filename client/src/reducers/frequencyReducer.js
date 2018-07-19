export function frequencyReducer( state = { frequency_data: [],status: ''}, action){
    if(action.type === 'UPDATE_FREQUENCY'){
        return {
            frequency_data: action.frequency_data,
            status: action.status
        }
    }
    return state;
}