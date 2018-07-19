export function watchRepoReducer( state = { profile: [] },action){
    if(action.type === 'UPDATE_WATCHREPO'){
        return {
            profile: action.profile
        }
    }
    return state;
}