export function complexityReducer( state = { complexity_data: [],status:''},action){
    if(action.type === 'UPDATE_COMPLEXITY'){
        return {
            complexity_data: action.complexity_data,
            status: action.status
        }
    }
    return state;
}