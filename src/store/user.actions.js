import { userService } from "../services/user.service.js";
import { socketService } from "../services/socket.service.js";
import { store } from "../store/store.js";

import { LOADING_DONE, LOADING_START } from "./system.reducer.js";
import { EDIT_USERS, SET_USERS, SET_USER, EDIT_USER } from "./user.reducer";


export async function loadUsers() {
  try {
    store.dispatch({ type: LOADING_START });
    const users = await userService.getUsers();
    store.dispatch({ type: SET_USERS, users });
  } catch (err) {
    console.log("UserActions: err in loadUsers", err);
  } finally {
    store.dispatch({ type: LOADING_DONE });
  }
}
export async function updateUser(updatedUser) {
  try {

    store.dispatch({ type: EDIT_USERS, user: updatedUser });
    await userService.updateUser(updatedUser);
  } catch (err) {
    console.log("UserActions: err in loadUsers", err);
  }
}

export async function editUser(user) {
  store.dispatch({ type: EDIT_USER, user })
  await userService.updateUser(user)
}
export async function login() {
  const userId = import.meta.env.VITE_TRELLO_USER_ID

  try {
    const user = await userService.getById(userId)
    store.dispatch({ type: SET_USER, user })
  } catch (err) {
    console.lo
  }
}

export async function addBoardToUser(boardId) {
  const user = store.getState().userModule.user
  console.log("addBoardToUser", user);
  const updatedUser = { ...user, idBoards: [...user.idBoards, boardId] }
  store.dispatch({ type: SET_USER, user: updatedUser })
}