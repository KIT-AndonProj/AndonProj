export function outdatedReducer( state = { outdated_data: [], status: ''},action){
    if( action.type === 'UPDATE_OUTDATED'){
        return {
            outdated_data: action.outdated_data,
            status: action.status
        }
    }
    return state;
}