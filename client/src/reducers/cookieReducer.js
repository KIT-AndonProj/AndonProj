export default function cookieReducer(state = { id:''}, action) {
    if(action.type === 'COOKIE') {
      return {
          id: action.user_id,
        }
    }
    return state;
  }