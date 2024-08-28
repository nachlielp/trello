export const storageService = {
    query,
    get,
    post,
    put,
    putSubEntity,
    remove,
}

function query(entityType, delay = 1) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

function get(entityType, entityId) {
    return query(entityType).then(entities => {
        const entity = entities.find(entity => entity.id === entityId);
        if (!entity) {
            throw {
                error: `Get failed, cannot find entity with id: ${entityId} in: ${entityType}`,
                entityType,
                entityId,
                status: 404
            };
        }
        return entity;
    });
}

function post(entityType, newEntity) {
    newEntity.id = _makeId()
    return query(entityType).then(entities => {
        entities.push(newEntity)
        _save(entityType, entities)
        return newEntity
    })
}

function put(entityType, updatedEntity) {

    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity.id === updatedEntity.id)
        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`)
        const entityToUpdate = { ...entities[idx], ...updatedEntity }
        entities.splice(idx, 1, entityToUpdate)
        _save(entityType, entities)
        return entityToUpdate
    })
}

function putSubEntity(entityType, updatedEntity, boardId) {
    return query(entityType).then(entities => {
        const board = entities.find(entity => entity.id === boardId);
        if (!board) throw new Error(`Board with id: ${boardId} not found`);

        const idx = board[entityType].findIndex(entity => entity.id === updatedEntity.id);
        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${updatedEntity.id} in: ${entityType}`);

        const entityToUpdate = { ...board[entityType][idx], ...updatedEntity };
        board[entityType].splice(idx, 1, entityToUpdate);

        _save(entityType, entities);
        return entityToUpdate;
    });
}
function remove(entityType, entityId) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === entityId)
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1)
        _save(entityType, entities)
    })
}

// Private functions

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}