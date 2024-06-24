import { boardService } from '../services/board.service.local'
import { store } from './store'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARDS, SET_BOARD, UPDATE_BOARD, ADD_BOARD_MSG, UPDATE_TASK, ADD_WORKSPACE, REMOVE_WORKSPACE, SET_WORKSPACE, ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM } from './trello.reducer'

export async function loadWorkspaces() {
    try {
        const workspaces = await workspaceService.query()
        console.log('Workspaces from DB:', workspaces)
        store.dispatch(getCmdSetWorkspaces(workspaces))
    } catch (err) {
        console.log('Cannot load workspaces', err)
        throw err
    }
}

// export async function addWorkspace(workspace) {
//     try {
//         const savedWorkspace = await workspaceService.save(workspace)
//         console.log('Added Workspace', savedWorkspace)
//         store.dispatch(getCmdAddWorkspace(savedWorkspace))
//         return savedWorkspace
//     } catch (err) {
//         console.log('Cannot add workspace', err)
//         throw err
//     }
// }

// export async function removeWorkspace(workspaceId) {
//     try {
//         await workspaceService.remove(workspaceId)
//         store.dispatch(getCmdRemoveWorkspace(workspaceId))
//     } catch (err) {
//         console.log('Cannot remove workspace', err)
//         throw err
//     }
// }

// export async function loadBoards() {
//     try {
//         const boards = await boardService.query()
//         console.log('Boards from DB:', boards)
//         store.dispatch(getCmdSetBoards(boards))
//     } catch (err) {
//         console.log('Cannot load boards', err)
//         throw err
//     }
// }

export async function loadBoard(boardId) {
    try {
        const board = await boardService.getById(boardId)
        console.log('Board from DB:', board)
        store.dispatch(getCmdSetBoard(board))
    } catch (err) {
        console.log('Cannot load board', err)
        throw err
    }
}

export async function removeBoard(boardId) {
    try {
        await boardService.remove(boardId)
        store.dispatch(getCmdRemoveBoard(boardId))
    } catch (err) {
        console.log('Cannot remove board', err)
        throw err
    }
}

export async function addBoard(board) {
    try {
        const savedBoard = await boardService.save(board)
        console.log('Added Board', savedBoard)
        store.dispatch(getCmdAddBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot add board', err)
        throw err
    }
}

export async function updateBoard(board) {
    try {
        const savedBoard = await boardService.save(board)
        console.log('Updated Board:', savedBoard)
        store.dispatch(getCmdUpdateBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot save board', err)
        throw err
    }
}

export async function addBoardMsg(boardId, txt) {
    try {
        const msg = await boardService.addBoardMsg(boardId, txt)
        console.log('Added Board message', msg)
        store.dispatch(getCmdAddBoardMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add board msg', err)
        throw err
    }
}

export async function updateTask(boardId, groupId, task, activityTitle) {
    try {
        const [savedTask, activity] = await boardService.updateTask(boardId, groupId, task, activityTitle)
        console.log('Updated task', savedTask)
        store.dispatch(getCmdUpdateTask(groupId, task, activity))
        return savedTask
    } catch (err) {
        console.log('Cannot update task', err)
        throw err
    }
}


export async function addItem(boardId, item) {
    try {
        const savedItem = await boardService.addItem(boardId, item)
        console.log('Added item', savedItem)
        store.dispatch(getCmdAddItem(savedItem))
        return savedItem
    } catch (err) {
        console.log('Cannot add item', err)
        throw err
    }
}

export async function removeItem(boardId, itemId) {
    try {
        await boardService.removeItem(boardId, itemId)
        store.dispatch(getCmdRemoveItem(itemId))
    } catch (err) {
        console.log('Cannot remove item', err)
        throw err
    }
}

export async function updateItem(boardId, item) {
    try {
        const savedItem = await boardService.updateItem(boardId, item)
        console.log('Updated item', savedItem)
        store.dispatch(getCmdUpdateItem(savedItem))
        return savedItem
    } catch (err) {
        console.log('Cannot update item', err)
        throw err
    }
}

// Command Creators:
function getCmdRemoveBoard(boardId) {
    return {
        type: REMOVE_BOARD,
        boardId
    }
}

function getCmdAddBoard(board) {
    return {
        type: ADD_BOARD,
        board
    }
}

function getCmdUpdateBoard(board) {
    return {
        type: UPDATE_BOARD,
        board
    }
}

function getCmdSetBoards(boards) {
    return {
        type: SET_BOARDS,
        boards
    }
}

function getCmdSetBoard(board) {
    return {
        type: SET_BOARD,
        board
    }
}

function getCmdAddBoardMsg(msg) {
    return {
        type: ADD_BOARD_MSG,
        msg
    }
}

function getCmdUpdateTask(groupId, task, activity) {
    return {
        type: UPDATE_TASK,
        groupId,
        task,
        activity
    }
}



// unitTestActions()
async function unitTestActions() {
    await loadBoards()
    await addBoard(boardService.getEmptyBoard())
    await updateBoard({
        _id: 'm1oC7',
        title: 'Board-Good',
    })
    await removeBoard('m1oC7')
    // TODO unit test loadBoard
    // TODO unit test addBoardMsg
    // TODO unit test updateTask
}

