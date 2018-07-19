export default function currentRepoReducer( state = { profile : [], commit_data:[] },action){
    if(action.type === 'CURRENT_REPO'){
        return {
            profile: action.profile,
            commit_data: action.commit_data
        }
    }
    return state;
}