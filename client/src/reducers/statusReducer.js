export function statusReducer( state = { status: ''},action){
    if(action.type === 'UPDATE_STATUS'){
        return {
            status: action.status
        }
    }
    return state;
}