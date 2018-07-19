export default function updateFrequencyCommit(frequency_data,status){
    return{
        type: "UPDATE_FREQUENCY",
        frequency_data: frequency_data,
        status: status
    };
};