export default function currentBugspotReducer( state = { bugspot_data: [],status:'' },action){
    if(action.type === 'UPDATE_BUGSPOT'){
        return {
            bugspot_data: action.bugspot_data,
            status: action.status
        }
    }
    return state;
}