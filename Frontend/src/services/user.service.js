import { httpService } from "./http.service"

const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser"

export const userService = {
    logout,
    signup,
    getWorkspaceUsers,
    updateUser,
    getByUserName,
    getByEmail,
}

window.userService = userService

async function getWorkspaceUsers(usersIds) {
    try {
        const users = await httpService.get("user/users", usersIds)
        return users
    } catch (err) {
        throw err
    }
}
async function getByUserName(username) {
    try {
        const data = await httpService.get(`user/u/${username}`)
        return data
    } catch {
        console.log(err)
    }
}
async function getByEmail(email) {
    try {
        const user = await httpService.get("user/e", { email })
        return user
    } catch (err) {
        console.error(err)
    }
}

async function updateUser(updatedUser) {
    try {
        const user = await httpService.put("user", updatedUser)

        return user
    } catch (err) {
        console.log(err)
    }
}

async function signup(userCred) {
    try {
        return await httpService.post("auth/signup", userCred)
    } catch (err) {
        console.log(err)
        throw err
    }
}

async function logout() {
    await httpService.post("auth/logout")
}
