export default function addCurrentRepo( profile, commit_data){
    return{
        type: 'CURRENT_REPO',
        profile: profile,
        commit_data: commit_data
    };
};