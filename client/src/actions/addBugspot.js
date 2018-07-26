export default function updateBugspot(data,status) {
    return {
        type: 'UPDATE_BUGSPOT',
        data: data,
        status: status
    };
};
