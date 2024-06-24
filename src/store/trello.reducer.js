

export const SET_LISTS = 'SET_LISTS'
export const SET_MEMBERS = 'SET_MEMBERS'
export const SET_BOARD = 'SET_BOARD'
export const SET_CARDS = 'SET_CARDS'

import boardInfo from '../../JSON/board-info.json'; // Adjust the path as necessary
import boardList from '../../JSON/board-list.json';
import boardMembers from '../../JSON/board-members.json';
import listCards from '../../JSON/list-cards.json';


const initialState = {
    cards: [],
    lists: [],
    members: [],
    board: []
}

export function trelloReducer(state = initialState, action) {
    console.log('action: ', action)
    var newState = state
    switch (action.type) {
        case SET_LISTS:
            newState = { ...state, lists: action.lists }
            break
        case SET_CARDS:
            newState = { ...state, cards: action.cards }
            break
        case SET_MEMBERS:
            newState = { ...state, members: action.members }
            break
        case SET_BOARD:
            newState = { ...state, board: action.board }
            break
        default:
            return state
    }
    console.log('newState: ', newState)
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const board1 = { _id: 'b101', title: 'Board ' + parseInt(Math.random() * 10) }
    const board2 = { _id: 'b102', title: 'Board ' + parseInt(Math.random() * 10) }

    state = boardReducer(state, { type: SET_BOARDS, boards: [board1] })
    console.log('After SET_BOARDS:', state)

    state = boardReducer(state, { type: ADD_BOARD, board: board2 })
    console.log('After ADD_BOARD:', state)

    state = boardReducer(state, { type: UPDATE_BOARD, board: { ...board2, title: 'Good' } })
    console.log('After UPDATE_BOARD:', state)

    state = boardReducer(state, { type: REMOVE_BOARD, boardId: board2._id })
    console.log('After REMOVE_BOARD:', state)

    const msg = { _id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
    state = boardReducer(state, { type: ADD_BOARD_MSG, boardId: board1._id, msg })
    console.log('After ADD_BOARD_MSG:', state)



    // state = boardReducer(state, {type: REMOVE_BOARD, boardId: board1._id})
    // console.log('After REMOVE_BOARD:', state)
}


