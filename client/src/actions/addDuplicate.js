export default function addDuplicate(duplicate_data,status){
    return {
        type: 'UPDATE_DUPLICATE',
        duplicate_data: duplicate_data,
        status: status
};
}