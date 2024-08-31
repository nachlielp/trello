import { storageService } from "./async-storage.service";
import { httpService } from "./http.service";
import { USERS_KEY } from "./util.service";

const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser";

export const userService = {
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  getWorkspaceUsers,
  getById,
  remove,
  updateUser,
  changeScore,
  getByUserName,
  getByEmail,
};

window.userService = userService;

function getWorkspaceUsers() {
  return storageService.query(USERS_KEY);
  // return httpService.get(`user`)
}
async function getByUserName(username) {
  try {
    const data = await httpService.get(`user/u/${username}`);
    return data;
  } catch {
    console.log(err);
  }
}
async function getByEmail(email) {
  try {
    const user = await httpService.get("user/e", { email });
    return user;
  } catch (err) {
    console.error(err);
  }
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

async function updateUser(updatedUser) {
  try {
    const user = await httpService.put("user", updatedUser);

    return user;
  } catch (err) {
    console.log(err);
  }
}

// async function login(userCred) {
//   const userId = import.meta.env.VITE_TRELLO_USER_ID;
//   const users = await storageService.query(USERS_KEY);
//   const user = users.find((user) => user.id === userId);
//   // const user = await httpService.post('auth/login', userCred)
//   if (user) return saveLocalUser(user);
// }

async function signup(userCred) {
  return await httpService.post("/signup", userCred);
}

async function logout() {
  await httpService.post("auth/logout");
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
