export function addCookie(user_id) {
    return {
        type: 'COOKIE',
        user_id: user_id,
    };
};