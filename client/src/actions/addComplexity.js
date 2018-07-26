export default function updateComplexity(data,status){
    return {
        type: "UPDATE_COMPLEXITY",
        data: data,
        status: status
    };
};