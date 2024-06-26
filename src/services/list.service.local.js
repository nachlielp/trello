
import { storageService } from './async-storage.service'


const STORAGE_KEY = 'lists'

export const listService = {
    query,
    getById,
    save,
    remove
}

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(listId) {
    return storageService.get(STORAGE_KEY, listId)
}

function save(list) {
    return storageService.put(STORAGE_KEY, list)
}

function remove(listId) {
    return storageService.remove(STORAGE_KEY, listId)
}