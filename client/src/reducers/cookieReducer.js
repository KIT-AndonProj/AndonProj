
export default function cookieReducer(state = { username:'',gitName:'',imgURL:'' }, action) {
    if(action.type === 'COOKIE') {
      return {
          username: action.username,
          gitName: action.gitName,
          imgURL: action.imgURL,
        }
    }
    return state;
  }