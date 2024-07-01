export const SET_BOARDS = "SET_BOARDS";
export const EDIT_BOARD = "EDIT_BOARD";

const initialState = {
  boards:[]
};

export function workspaceReducer(state = initialState, action) {
  var newState = state;
  switch (action.type) {
    case SET_BOARDS:
      newState = { ...state, boards: action.boards };
      break;
    // case EDIT_USERS:
    //     newState = {...state, users: [...state.users,action.user],undoUsers: [...state.users] }
    // break;
    // case SET_USER:
    //   newState = {...state, user: action.user}
    //   break
    // default:
  }
  // For debug:
  // window.userState = newState
  // console.log('State:', newState)
  return newState;
}
