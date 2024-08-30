import { storageService } from "./async-storage.service";
import { httpService } from "./http.service";
import { USERS_KEY } from "./util.service";

const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser";

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  getWorkspaceUsers,
  getById,
  remove,
  updateUser,
  changeScore,
};

window.userService = userService;

function getWorkspaceUsers() {
  return storageService.query(USERS_KEY);
  // return httpService.get(`user`)
}

async function getById(userId) {
  try {
    const user = await storageService.get(USERS_KEY, userId);
    return user;
  } catch (err) {
    console.error(err);
  }
  // const user = await httpService.get(`user/${userId}`)
}

function remove(userId) {
  return storageService.remove(USERS_KEY, userId);
  // return httpService.delete(`user/${userId}`)
}

async function updateUser({ id, ...updatedUser }) {
  let user = await storageService.get(USERS_KEY, id);
  user = { ...updatedUser, id };
  await storageService.put(USERS_KEY, user);

  return user;
}

async function login(userCred) {
  const userId = import.meta.env.VITE_TRELLO_USER_ID;
  const users = await storageService.query(USERS_KEY);
  const user = users.find((user) => user.id === userId);
  // const user = await httpService.post('auth/login', userCred)
  if (user) return saveLocalUser(user);
}

async function signup(userCred) {
  if (!userCred.imgUrl)
    userCred.imgUrl =
      "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png";
  userCred.score = 10000;
  const user = await storageService.post(USERS_KEY, userCred);
  // const user = await httpService.post('auth/signup', userCred)
  return saveLocalUser(user);
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
  // return await httpService.post('auth/logout')
}

async function changeScore(by) {
  const user = getLoggedinUser();
  if (!user) throw new Error("Not loggedin");
  user.score = user.score + by || by;
  await update(user);
  return user.score;
}

function saveLocalUser(user) {
  user = {
    _id: user._id,
    fullname: user.fullname,
    imgUrl: user.imgUrl,
    score: user.score,
    isAdmin: user.isAdmin,
  };
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
  return user;
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER));
}


