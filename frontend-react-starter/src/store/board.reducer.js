export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const ADD_BOARD_MSG = 'ADD_BOARD_MSG'
export const UPDATE_TASK = 'UPDATE_TASK'

const initialState = {
    board: null,
    boards: [],
}

export function boardReducer(state = initialState, action) {
    var newState = state
    var boards
    switch (action.type) {
        case SET_BOARDS:
            newState = { ...state, boards: action.boards }
            break
        case SET_BOARD:
            newState = { ...state, board: action.board }
            break
        case REMOVE_BOARD:
            boards = state.boards.filter(board => board._id !== action.boardId)
            newState = { ...state, boards}
            break
        case ADD_BOARD:
            newState = { ...state, boards: [...state.boards, action.board] }
            break
        case UPDATE_BOARD:
            boards = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
            newState = { ...state, boards }
            break
        case ADD_BOARD_MSG:
            newState = { ...state, board: {...state.board, msgs: [...state.board.msgs || [], action.msg]} }
            break
        case UPDATE_TASK:
            const board = {...state.board}
            board.groups = state.board.groups.map(g => {
                if (g.id !== action.groupId) return g
                const group = {...g}
                group.tasks = group.tasks.map(t => (t.id !== action.task.id)? t : action.task)
                return group
            })
            board.activities = [...board.activities, action.activity]
            newState = { ...state, board }
            break
    
        default:
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const board1 = {_id: 'b101', title: 'Board ' + parseInt(Math.random()*10)}
    const board2 = {_id: 'b102', title: 'Board ' + parseInt(Math.random()*10)}

    state = boardReducer(state, {type: SET_BOARDS, boards: [board1]})
    console.log('After SET_BOARDS:', state)
    
    state = boardReducer(state, {type: ADD_BOARD, board: board2})
    console.log('After ADD_BOARD:', state)
    
    state = boardReducer(state, {type: UPDATE_BOARD, board: {...board2, title: 'Good'}})
    console.log('After UPDATE_BOARD:', state)

    state = boardReducer(state, {type: REMOVE_BOARD, boardId: board2._id})
    console.log('After REMOVE_BOARD:', state)

    const msg = {_id: 'm'+parseInt(Math.random()*100), txt: 'Some msg'}
    state = boardReducer(state, {type: ADD_BOARD_MSG, boardId: board1._id, msg})
    console.log('After ADD_BOARD_MSG:', state)
    


    // state = boardReducer(state, {type: REMOVE_BOARD, boardId: board1._id})
    // console.log('After REMOVE_BOARD:', state)
}


