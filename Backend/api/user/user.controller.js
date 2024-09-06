import { ObjectId } from "mongodb";
import { authService } from "../auth/auth.service.js";
import { userService } from "./user.service.js";

export async function checkUser(req, res) {
  try {
    const user = authService.validateToken(req.cookies.loginToken);
    const existUser = user ? await userService.getById(user.id) : null;

    if (!existUser) {
      if (user || req.cookies?.loginToken) {
        res.clearCookie("loginToken");
      }
      res.send();
    } else {
      existUser.id = existUser._id;
      delete existUser._id;
      return res.status(200).send(existUser);
    }
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
  const { email } = req.query;
  try {
    const existUser = await userService.getByEmail(email);
    if (!existUser) {
      return res.send({ exist: false });
    }

    res.send({ exist: true });
  } catch (err) {
    console.error("Couldn't get user", err);
    res.status(400).send("Couldn't get user");
  }
}
export async function userByUserName(req, res) {
  const { username } = req.params;
  try {
    const existUser = await userService.getByUsername(username);
    if (!existUser) return res.status(400).send("Couldn't get user");
    res.send(existUser);
  } catch (err) {
    console.error("Couldn't get user", err);
    res.status(400).send("Couldn't get user");
  }
}
export async function updateUser(req, res) {
  const loggedinUser = req.loggedinUser;
  const { id } = req.body;
  if (!id) {
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
    ...req.body,
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

export async function getUsersArr(req, res) {
  const { userIds } = req.query;
  if (!userIds) return res.status(400).send("Couldn't get users");
  const users = await userService.getUsers(userIds);
  res.send(users);
}
