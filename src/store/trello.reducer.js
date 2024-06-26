

export const SET_LISTS = 'SET_LISTS'
export const SET_MEMBERS = 'SET_MEMBERS'
export const SET_BOARD = 'SET_BOARD'
export const SET_CARDS = 'SET_CARDS'

export const SET_IS_EXPANDED = 'SET_IS_EXPANDED'

export const ADD_CARD = 'ADD_CARD'

export const ADD_LIST = 'ADD_LIST'

import boardInfo from '../../JSON/board-info.json'; // Adjust the path as necessary
import boardList from '../../JSON/board-list.json';
import boardMembers from '../../JSON/board-members.json';
import listCards from '../../JSON/list-cards.json';


const initialState = {
    cards: [],
    lists: [],
    members: [],
    board: {},
    isExpanded: true
}

export function trelloReducer(state = initialState, action) {
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
        case SET_IS_EXPANDED:
            newState = { ...state, isExpanded: action.isExpanded }
            break

        case ADD_CARD:
            newState = { ...state, cards: [...state.cards, action.card] }
            break

        case ADD_LIST:
            newState = { ...state, lists: [...state.lists, action.list] }
            break

        default:
            return state
    }
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


