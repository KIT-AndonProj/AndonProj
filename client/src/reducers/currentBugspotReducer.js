export default function currentBugspotReducer( state = { data: [],status:'' },action){
    if(action.type === 'UPDATE_BUGSPOT'){
        return {
            data: action.data,
            status: action.status
        }
    }
    return state;
}