

export const SET_MEMBERS = 'SET_MEMBERS'
export const SET_BOARD = 'SET_BOARD'

export const SET_IS_EXPANDED = 'SET_IS_EXPANDED'

export const ADD_TASK = 'ADD_TASK'

export const ADD_GROUP = 'ADD_GROUP'
export const ARCHIVE_GROUP = 'ARCHIVE_GROUP'
export const EDIT_GROUP = 'EDIT_GROUP'

const initialState = {
    members: [],
    board: {},
    isExpanded: true
}

export function boardReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {

        case SET_MEMBERS:
            newState = { ...state, members: action.members }
            break
        case SET_BOARD:
            newState = { ...state, board: action.board }
            break
        case SET_IS_EXPANDED:
            newState = { ...state, isExpanded: action.isExpanded }
            break

        case ADD_GROUP:
            newState = {
                ...state, board: {
                    ...state.board,
                    groups: [...state.board.groups, action.group]
                }
            }
            break

        case ARCHIVE_GROUP:
            newState = {
                ...state,
                board: {
                    ...state.board,
                    groups: state.board.groups.map(group =>
                        group.id === action.groupId ? { ...group, closed: true, pos: null } : group
                    )
                }
            };
            break;

        case EDIT_GROUP:
            newState = {
                ...state,
                board: {
                    ...state.board,
                    groups: state.board.groups.map(group => group.id === action.group.id ? action.group : group)
                }
            }
            break

        case ADD_TASK:
            newState = {
                ...state,
                board: {
                    ...state.board,
                    groups: state.board.groups.map(group =>
                        group.id === action.task.idGroup
                            ? { ...group, tasks: [...(group.tasks || []), action.task] }
                            : group
                    )
                }
            }
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


