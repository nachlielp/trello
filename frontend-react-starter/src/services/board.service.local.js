
import { storageService } from './async-storage.service'
import { utilService } from './util.service'
import { userService } from './user.service'

const STORAGE_KEY = 'board'

const board = {
    title: "Robot dev proj",
    isStarred: false,
    archivedAt: 1589983468418,
    createdBy: {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "imgUrl": "http://some-img"
    },
    style: {
        backgroundImage: ""
    },
    labels: [
        {
            "id": "l101",
            "title": "Done",
            "color": "#61bd4f"
        },
        {
            "id": "l102",
            "title": "Progress",
            "color": "#61bd33"
        }
    ],
    members: [
        {
            "_id": "u101",
            "fullname": "Tal Taltal",
            "imgUrl": "https://www.google.com"
        },
        {
            "_id": "u102",
            "fullname": "Josh Ga",
            "imgUrl": "https://www.google.com"
        }
    ],
    groups: [
        {
            "id": "g101",
            "title": "Group 1",
            "archivedAt": 1589983468418,
            "tasks": [
                {
                    "id": "c101",
                    "title": "Replace logo"
                },
                {
                    "id": "c102",
                    "title": "Add Samples"
                }
            ],
            "style": {}
        },
        {
            "id": "g102",
            "title": "Group 2",
            "tasks": [
                {
                    "id": "c103",
                    "title": "Do that",
                    "archivedAt": 1589983468418,
                },
                {
                    "id": "c104",
                    "title": "Help me",
                    "status": "inProgress", // monday / both
                    "priority": "high",  // monday / both
                    "dueDate": "2024-09-24",
                    "description": "description",
                    "comments": [ // in Trello this is easier implemented as an activity
                        {
                            "id": "ZdPnm",
                            "title": "also @yaronb please CR this",
                            "createdAt": 1590999817436,
                            "byMember": {
                                "_id": "u101",
                                "fullname": "Tal Tarablus",
                                "imgUrl": ""
                            }
                        }
                    ],
                    "checklists": [
                        {
                            "id": "YEhmF",
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": "212jX",
                                    "title": "To Do 1",
                                    "isDone": false
                                }
                            ]
                        }
                    ],
                    "memberIds": ["u101"],
                    "labelIds": ["l101", "l102"],
                    "byMember": {
                        "_id": "u101",
                        "fullname": "Tal Tarablus",
                        "imgUrl": ""
                    },
                    "style": {
                        "backgroundColor": "#26de81"
                    }
                }
            ],
            "style": {}
        }
    ],
    activities: [
        {
            "id": "a101",
            "title": "Changed Color",
            "createdAt": 154514,
            "byMember": {
                "_id": "u101",
                "fullname": "Abi Abambi",
                "imgUrl": "http://some-img"
            },
            "group": {
                "id": "g101",
                "title": "Urgent Stuff"
            },
            "task": {
                "id": "c101",
                "title": "Replace Logo"
            }
        }
    ],

    // For Monday draggable columns (optional)
    cmpsOrder: ["StatusPicker", "MemberPicker", "DatePicker"]
}

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
    getDemoBoard,
    addBoardMsg,
    updateTask,
    getTaskEditCmps
}
window.boardSer = boardService


async function query(filterBy = { title: '' }) {
    var boards = await storageService.query(STORAGE_KEY)
    if (filterBy.title) {
        const regex = new RegExp(filterBy.title, 'i')
        boards = boards.filter(board => regex.test(board.title))
    }
    // Return just preview info about the boards
    boards = boards.map(({ _id, title, owner }) => ({ _id, title, owner }))
    return boards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    var savedBoard
    if (board._id) {
        const boardToUpdate = {
            _id: board._id,
            title: board.title
        }
        savedBoard = await storageService.put(STORAGE_KEY, boardToUpdate)
    } else {
        // Later, owner is set by the backend
        board.owner = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, board)
    }
    return savedBoard
}

async function addBoardMsg(boardId, txt) {

    // Later, this is all done by the backend
    const board = await getById(boardId)
    if (!board.msgs) board.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    board.msgs.push(msg)
    await storageService.put(STORAGE_KEY, board)

    return msg
}

async function updateTask(boardId, groupId, task, activityTitle) {
    // Later, this is all done by the backend
    const board = await getById(boardId)
    const group = board.groups.find(g => g.id === groupId)
    const idx = group.tasks.findIndex(t => t.id === task.id)
    group.tasks[idx] = task

    const activity = _createActivity(activityTitle, _toMiniTask(task), _toMiniGroup(group))
    board.activities.push(activity)
    await storageService.put(STORAGE_KEY, board)

    return [task, activity]
}

function getTaskEditCmps(task, board) {
    const cmps = [
        {
            type: 'StatusPicker',
            info: {
                label: 'Status:',
                propName: 'status',
                selectedStatus: task.status,
                statuses: _getStatuses()
            }
        },
        {
            type: 'DatePicker',
            info: {
                label: 'Due date:',
                propName: 'dueDate',
                selectedDate: task.dueDate,
            }
        },
        {
            type: 'MemberPicker',
            info: {
                label: 'Members: ',
                propName: 'memberIds',
                selectedMemberIds: task.memberIds || [],
                members: board.members
            }
        }
    ]
    return cmps
}

function getEmptyBoard() {
    return {
        title: 'Board -' + (Date.now() % 1000),
        activities: []
    }
}

function getDemoBoard() {
    return structuredClone(board)
}

function _createActivity(title, task, group = null) {
    return {
        id: utilService.makeId(),
        createdAt: Date.now(),
        byMember: userService.getLoggedinUser(),
        title,
        task,
        group
    }
}

function _getStatuses() {
    return ['open', 'inProgress', 'done']
}

function _toMiniGroup(group) {
    return { id: group.id, title: group.title }
}

function _toMiniTask(task) {
    return { id: task.id, title: task.title }
}


// TEST DATA
// storageService.post(STORAGE_KEY, board).then(savedBoard => console.log('Added board', savedBoard))