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
    case SET_BOARD:
      newState = { ...state, board: action.board };
      break;
    case EDIT_LABEL:
      newState = {
        ...state,
        board: {
          ...state.board,
          labelNames: state.board.labelNames.map(l => l.color === action.label.color ? action.label : l)
        }
      };
      break;
    case ADD_TASK:
      newState = {
        ...state,
        board: {
          ...state.board,
          groups: state.board.groups.map(group =>
            group.id === action.task.idGroup
              ? { ...group, tasks: [...(group.tasks || []), action.task] }
              : group
          )
        }
      };
      break;
    case EDIT_TASK:
      newState = {
        ...state,
        board: {
          ...state.board,
          groups: state.board.groups.map(group =>
            group.id === action.task.idGroup
              ? { ...group, tasks: group.tasks.map(t => t.id === action.task.id ? action.task : t) }
              : group
          )
        }
      };
      break;
    case ADD_GROUP:
      newState = {
        ...state, board: {
          ...state.board,
          groups: [...state.board.groups, action.group]
        }
      };
      break;
    case EDIT_GROUP:
      newState = {
        ...state,
        board: {
          ...state.board,
          groups: state.board.groups.map(group => group.id === action.group.id ? action.group : group)
        }
      };
      break;
    case COPY_GROUP:
      newState = {
        ...state,
        board: {
          ...state.board,
          groups: action.groups
        }
      };
      break;
    case MOVE_ALL_CARDS:
      newState = {
        ...state,
        board: {
          ...state.board,
          groups: state.board.groups.map(g => {
            if (g.id === action.sourceGroup.id) {
              return { ...g, tasks: action.sourceGroup.tasks };
            }
            if (g.id === action.targetGroup.id) {
              return { ...g, tasks: [...action.targetGroup.tasks] };
            }
            return g;
          })
        }
      };
      break;
    case ARCHIVE_ALL_CARDS:
      newState = {
        ...state,
        board: {
          ...state.board,
          groups: state.board.groups.map(g => g.id === action.group.id ? action.group : g)
        }
      };
      break;
    case SORT_GROUP:
      newState = {
        ...state,
        board: {
          ...state.board,
          groups: state.board.groups.map(g => g.id === action.group.id ? action.group : g)
        }
      };
      break;
    default:
      return state;
  }
  return newState;
}