import Cryptr from "cryptr";
import bcrypt from "bcryptjs";

import { userService } from "../user/user.service.js";

const cryptr = new Cryptr(process.env.CRYPTR_PASS);
export const authService = {
  getLoginToken,
  validateToken,
  login,
  signup,
};
async function login(email, password) {
  var user = await userService.getByEmail(email);
  if (!user) throw "Unknown username";

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw "Invalid username or password";

  delete user.password;
  user.id = user._id;
  delete user._id;

  return user;
}

function getLoginToken(user) {
  const str = JSON.stringify(user);
  const encryptedStr = cryptr.encrypt(str);
  return encryptedStr;
}

function validateToken(token) {
  try {
    const json = cryptr.decrypt(token);
    const loggedinUser = JSON.parse(json);
    return loggedinUser;
  } catch (err) {}
  return null;
}

async function signup({ fullName, password, email }) {
  const saltRounds = 10;
  try {
    console.log(
      `auth.service - signup with username: ${fullName}, email: ${email}`
    );
    if (!fullName || !password || !email)
      throw "Missing required signup information";

    const userExist = await userService.getByEmail(email);
    if (userExist) throw "email already exists";

    const hash = await bcrypt.hash(password, saltRounds);
    return userService.save({
      fullName,
      password: hash,
      email,
      username: email.split("@")[0],
      starredBoardIds: [],
      bio: "",
      darkMode: "default",
    });
  } catch (err) {
    console.log(err);
  }
}
