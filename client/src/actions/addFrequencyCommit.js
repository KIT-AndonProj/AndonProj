export default function updateFrequencyCommit(data,status){
    return{
        type: 'UPDATE_FREQUENCY',
        data: data,
        status: status
    };
};