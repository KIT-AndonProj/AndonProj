export default function addDuplicate(data,status){
    return {
        type: 'UPDATE_DUPLICATE',
        data: data,
        status: status
};
}