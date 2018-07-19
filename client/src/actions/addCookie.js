export default function addCookie(username, gitName,imgURL) {
    return {
        type: 'COOKIE',
        username: username,
        gitName: gitName,
        imgURL: imgURL
    };
};
