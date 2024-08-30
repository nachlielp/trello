import { ObjectId } from "mongodb";
import { authService } from "../auth/auth.service.js";
import { userService } from "./user.service.js";

export async function checkUser(req, res) {
  try {
    const user = authService.validateToken(req.cookies.loginToken);
    const existUser = user ? await userService.getById(user.id) : null;

    if (!existUser) {
      res.send();
    } else {
      res.status(200).send(user);
    }

    res.send();
  } catch (err) {
    console.log(err);
    res.status(401).send({ err: "Failed to check" });
  }
}
export async function userById(req, res) {
  const { id } = req.params;
  try {
    const existUser = await userService.getById(id);
    if (!existUser) res.status(400).send("Couldn't get user");
    const existingObjectId = new ObjectId(existUser._id)
      .getTimestamp()
      .getTime();

    const userParams = {
      username: existUser.username,
      email: existUser.email,
      createdAt: existingObjectId,
      isAdmin: existUser.isAdmin,
      foundBugs: existUser.foundBugs,
    };
    res.send(userParams);
  } catch (err) {
    console.error("Couldn't get user", err);
    res.status(400).send("Couldn't get user");
  }
}
export async function userByEmail(req, res) {
  const { email } = req.params;
  try {
    const existUser = await userService.getByEmail(email);
    if (!existUser) res.send({ exist: false });

    res.send({ exist: true });
  } catch (err) {
    console.error("Couldn't get user", err);
    res.status(400).send("Couldn't get user");
  }
}
export async function updateUser(req, res) {
  const loggedinUser = req.loggedinUser;
  const { darkMode, bio, starredBoardIds, email, username, fullName, id } =
    req.body;
  if ((!darkMode, !bio, !starredBoardIds, !email, !username, !fullName, !id)) {
    return res.status(400).send("Couldn't update user");
  }

  if (!loggedinUser || loggedinUser.id !== id) {
    console.log(
      "updateUser",
      `user ${loggedinUser.id} tried to save not his user ${id}`
    );
    return res.status(400).send("Couldn't update user");
  }
  const userToSave = {
    darkMode,
    bio,
    starredBoardIds,
    email,
    username,
    fullName,
    id,
  };
  try {
    const savedUser = await userService.save(userToSave);
    res.send(savedUser);
  } catch (err) {
    console.error("err:", err);
    res.status(400).send("Couldn't save user");
  }
}
