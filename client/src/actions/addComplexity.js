export default function updateComplexity(complexity_data,status){
    return {
        type: "UPDATE_COMPLEXITY",
        complexity_data: complexity_data,
        status: status
    };
};