export const SET_USERS = "SET_USERS";
export const EDIT_USERS = "EDIT_USERS";
export const SET_USER = "SET_USER";
export const EDIT_USER = "EDIT_USER";

const initialState = {
  count: 10,
  user: null,
  users: [],
  watchedUser: null,
};

export function userReducer(state = initialState, action) {
  var newState = state;
  switch (action.type) {
    case SET_USERS:
      newState = { ...state, users: action.users };
      break;

    case EDIT_USERS:
      newState = {
        ...state,
        users: state.users.map((u) =>
          u.id === action.user.id ? action.user : u
        ),
        undoUsers: [...state.users],
      };
      break;

    case EDIT_USER:
      newState = { ...state, user: { ...state.user, ...action.user } };
      break;

    case SET_USER:
      newState = { ...state, user: action.user };
      break;
    default:
  }
  // For debug:
  // window.userState = newState
  // console.log('State:', newState)
  return newState;
}
