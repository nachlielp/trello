import { userService } from "../user/user.service.js";
import { authService } from "./auth.service.js";

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).send({ err: "Failed to Login" });
  }
  try {
    const user = await authService.login(email, password);

    const loginToken = authService.getLoginToken(user);
    console.log("User login: ", user);
    res.cookie("loginToken", loginToken, {
      sameSite: "None",
      secure: true,
      maxAge: 86400000,
    });
    res.json(user);
  } catch (err) {
    console.error("Failed to Login " + err);
    res.status(401).send({ err: "Failed to Login" });
  }
}
export async function signup(req, res) {
  try {
    const credentials = req.body;
    await authService.signup(credentials);

    const user = await authService.login(
      credentials.email,
      credentials.password
    );
    console.log("User signup:", user);

    const loginToken = authService.getLoginToken(user);
    res.cookie("loginToken", loginToken, {
      sameSite: "None",
      secure: true,
      maxAge: 86400000,
    });

    res.json(user);
  } catch (err) {
    console.error("Failed to signup " + err);
    if (err === "username already exists") {
      return res.status(409).send({ err: "This username already exists" });
    }
    res.status(400).send({ err: "Failed to signup" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("loginToken", {
      path: "/",
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      httpOnly: true,
      sameSite: "Strict",
    });
    res.send({ msg: "Logged out successfully" });
  } catch (err) {
    res.status(400).send({ err: "Failed to logout" });
  }
}
