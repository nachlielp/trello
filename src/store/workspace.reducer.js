export const SET_BOARDS = "SET_BOARDS";
export const EDIT_BOARD = "EDIT_BOARD";
export const ADD_BOARD = "ADD_BOARD";
export const SET_BOARD = "SET_BOARD";
export const EDIT_LABEL = "EDIT_LABEL";
export const ADD_TASK = "ADD_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const ADD_GROUP = "ADD_GROUP";
export const EDIT_GROUP = "EDIT_GROUP";
export const COPY_GROUP = "COPY_GROUP";
export const MOVE_ALL_CARDS = "MOVE_ALL_CARDS";
export const ARCHIVE_ALL_CARDS = "ARCHIVE_ALL_CARDS";
export const SORT_GROUP = "SORT_GROUP";

const initialState = {
  boards: [],
  name: "My Workspace",
  members: [],
  views: [],
  board: {},
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

    default:
      return state;
  }
  return newState;
}