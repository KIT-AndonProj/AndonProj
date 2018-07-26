export default function updateOutdated(data,status){
    return {
        type: 'UPDATE_OUTDATED',
        data: data,
        status: status
    }
}