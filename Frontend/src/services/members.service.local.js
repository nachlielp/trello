import { storageService } from "./async-storage.service"

const STORAGE_KEY = "members"

export const memberService = {
    query,
    getById,
    save,
    remove,
}

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(memberId) {
    return storageService.get(STORAGE_KEY, memberId)
}

function save(member) {
    return storageService.put(STORAGE_KEY, member)
}

function remove(memberId) {
    return storageService.remove(STORAGE_KEY, memberId)
}
