export default function updateOutdated(outdated_data,status){
    return {
        type: 'UPDATE_OUTDATED',
        outdated_data: outdated_data,
        status: status
    }
}