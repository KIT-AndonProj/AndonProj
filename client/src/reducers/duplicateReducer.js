export function duplicateReducer( state = { data: [], status:'' },action ){
    if(action.type==='UPDATE_DUPLICATE'){
        return {
            data: action.data,
            status : action.status
        }
    }
    return state;
}