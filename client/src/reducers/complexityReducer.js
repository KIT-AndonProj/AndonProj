export function complexityReducer( state = { data: [],status:''},action){
    if(action.type === 'UPDATE_COMPLEXITY'){
        return {
            data: action.data,
            status: action.status
        }
    }
    return state;
}