import { storageService } from './async-storage.service'

const STORAGE_KEY = 'cards'

export const cardService = {
    query,
    getById,
    save,
    remove
}

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(cardId) {
    return storageService.get(STORAGE_KEY, cardId)
}

function save(card) {
    return storageService.put(STORAGE_KEY, card)
}

function remove(cardId) {
    return storageService.remove(STORAGE_KEY, cardId)
}