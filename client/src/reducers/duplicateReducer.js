export function duplicateReducer( state = { duplicate_data: [], status:'' },action ){
    if(action.type==='UPDATE_DUPLICATE'){
        return {
            duplicate_data: action.duplicate_data,
            status : action.status
        }
    }
    return state;
}