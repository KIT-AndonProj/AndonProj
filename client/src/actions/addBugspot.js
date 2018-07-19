export default function updateBugspot(bugspot_data,status) {
    return {
        type: 'UPDATE_BUGSPOT',
        bugspot_data: bugspot_data,
        status: status
    };
};
