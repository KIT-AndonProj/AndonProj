export function outdatedReducer( state = { data: [], status: ''},action){
    if( action.type === 'UPDATE_OUTDATED'){
        return {
            data: action.data,
            status: action.status
        }
    }
    return state;
}