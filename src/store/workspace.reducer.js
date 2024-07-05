export const SET_BOARDS = "SET_BOARDS";
export const EDIT_BOARD = "EDIT_BOARD";
export const ADD_BOARD = "ADD_BOARD";

const initialState = {
  boards: [],
  name: "My Workspace",
  members: [],
  views: [],
};

export function workspaceReducer(state = initialState, action) {
  var newState = state;
  switch (action.type) {
    case SET_BOARDS:
      newState = { ...state, boards: action.boards };
      break;
    case EDIT_BOARD:
      newState = {
        ...state,
        boards: state.boards.map((board) =>
          board.id === action.board.id ? action.board : board
        ),
      };
      break;

    case ADD_BOARD:
      newState = { ...state, boards: [...state.boards, action.board] };
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
