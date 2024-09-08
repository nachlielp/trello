import { authService } from "../api/auth/auth.service.js";
import { asyncLocalStorage } from "../services/als.service.js";

export async function setupAsyncLocalStorage(req, res, next) {
  const storage = {};

  asyncLocalStorage.run(storage, async () => {
    if (!req.cookies?.loginToken) return next();
    const loggedinUser = authService.validateToken(req.cookies.loginToken);
    if (loggedinUser) {
      //   const user = await userService.getById(loggedinUser._id);
      //   if (user && user.role === "admin") {
      //     loggedinUser.isAdmin = true;
      //   } else {
      //     loggedinUser.isAdmin = false;
      //   }
      const alsStore = asyncLocalStorage.getStore();
      alsStore.loggedinUser = loggedinUser;
    }
    next();
  });
}
