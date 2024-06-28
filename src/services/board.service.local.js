
import { storageService } from './async-storage.service'
import { utilService } from './util.service'
import { userService } from './user.service'

const STORAGE_KEY = 'boards'


export const boardService = {
    // query,
    getById,
    save,
    remove,
    addCard,
    addList,
    archiveList,
    moveListPos,
    editList,
    // getEmptyBoard,
    // getDemoBoard,
    // addBoardMsg,
    // updateTask,
    // getTaskEditCmps
}
window.boardSer = boardService


// async function query(filterBy = { title: '' }) {
//     var boards = await storageService.query(STORAGE_KEY)
//     if (filterBy.title) {
//         const regex = new RegExp(filterBy.title, 'i')
//         boards = boards.filter(board => regex.test(board.title))
//     }
//     // Return just preview info about the boards
//     boards = boards.map(({ _id, title, owner }) => ({ _id, title, owner }))
//     return boards
// }

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

async function addCard(card) {
    const newCard = createNewCard(card)
    return storageService.postSubEntity('cards', newCard)
}
async function addList(list) {
    const listStorage = await storageService.get('lists', list.idBoard)
    list.pos = listStorage.lists.length + 1;
    const newList = createNewList(list)
    return storageService.postSubEntity('lists', newList)
}

async function archiveList(boardId, listId) {
    const listsStorage = await storageService.get('lists', boardId);
    const list = listsStorage.lists.find(l => l.id === listId)
    if (!list) {
        throw Error(`Attempting to archive a non-exsisting list by id: ${listId}`)
    }
    console.log("list to remove: ", list)

    const newList = {
        ...list,
        closed: true,
        pos: null,
    }

    await storageService.putSubEntity('lists', newList, boardId);
    await moveListsFromPosOneBackward(list.pos, boardId);
    return list;
}

async function editList(boardId, list) {
    const listsStorage = await storageService.get('lists', boardId);
    const listToUpdate = listsStorage.lists.find(l => l.id === list.id)
    if (!listToUpdate) {
        throw Error(`Attempting to edit a non-exsisting list by id: ${list.id}`)
    }
    console.log("list to remove: ", list)

    const newList = {
        ...list,
    }

    await storageService.putSubEntity('lists', newList, boardId);
    return list;
}


async function moveListPos(listId, newPos) {
    const boardLists = await storageService.get('lists', list.idBoard);
    const list = boardLists.lists.find(l => l.id === listId);

    const oldPos = list.pos;
    boardLists.lists = boardLists.lists.filter(l => l.id !== listId);

    boardLists.lists.forEach(l => {
        if (oldPos < newPos && l.pos > oldPos && l.pos <= newPos) {
            l.pos--;
        } else if (oldPos > newPos && l.pos >= newPos && l.pos < oldPos) {
            l.pos++;
        }
    });

    list.pos = newPos;
    boardLists.lists.push(list);

    await Promise.all(boardLists.lists.map(l => storageService.put('lists', l)));
    return list;
}

async function moveListsFromPosOneForward(pos, boardId) {
    const boardLists = await storageService.get('lists', boardId);
    boardLists.lists.forEach(l => {
        if (l.pos >= pos) {
            l.pos++;
        }
    });
    await Promise.all(boardLists.lists.map(l => storageService.put('lists', l)));
    return boardLists;
}

async function moveListsFromPosOneBackward(pos, boardId) {
    const boardLists = await storageService.get('lists', boardId);
    boardLists.lists.forEach(l => {
        if (l.pos >= pos) {
            l.pos--;
        }
    });
    await Promise.all(boardLists.lists.map(l => storageService.put('lists', l)));
    return boardLists;
}

function createNewList(list) {
    return {
        id: "",
        idBoard: list.idBoard,
        name: list.name,
        closed: false,
        color: null,
        subscribed: false,
        softLimit: null,
        pos: list.pos
    }
}
// async function addBoardMsg(boardId, txt) {

//     // Later, this is all done by the backend
//     const board = await getById(boardId)
//     if (!board.msgs) board.msgs = []

//     const msg = {
//         id: utilService.makeId(),
//         by: userService.getLoggedinUser(),
//         txt
//     }
//     board.msgs.push(msg)
//     await storageService.put(STORAGE_KEY, board)

//     return msg
// }

// async function updateTask(boardId, groupId, task, activityTitle) {
//     // Later, this is all done by the backend
//     const board = await getById(boardId)
//     const group = board.groups.find(g => g.id === groupId)
//     const idx = group.tasks.findIndex(t => t.id === task.id)
//     group.tasks[idx] = task

//     const activity = _createActivity(activityTitle, _toMiniTask(task), _toMiniGroup(group))
//     board.activities.push(activity)
//     await storageService.put(STORAGE_KEY, board)

//     return [task, activity]
// }

// function getTaskEditCmps(task, board) {
//     const cmps = [
//         {
//             type: 'StatusPicker',
//             info: {
//                 label: 'Status:',
//                 propName: 'status',
//                 selectedStatus: task.status,
//                 statuses: _getStatuses()
//             }
//         },
//         {
//             type: 'DatePicker',
//             info: {
//                 label: 'Due date:',
//                 propName: 'dueDate',
//                 selectedDate: task.dueDate,
//             }
//         },
//         {
//             type: 'MemberPicker',
//             info: {
//                 label: 'Members: ',
//                 propName: 'memberIds',
//                 selectedMemberIds: task.memberIds || [],
//                 members: board.members
//             }
//         }
//     ]
//     return cmps
// }

// function getEmptyBoard() {
//     return {
//         title: 'Board -' + (Date.now() % 1000),
//         activities: []
//     }
// }

// function getDemoBoard() {
//     return structuredClone(board)
// }

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

function createNewCard(card) {
    console.log('createNewCard.card', card)
    return {
        badges: {
            attachmentsByType: {
                trello: {
                    board: 0,
                    card: 0
                }
            },
            externalSource: null,
            location: false,
            votes: 0,
            viewingMemberVoted: false,
            subscribed: false,
            attachments: 0,
            fogbugz: "",
            checkItems: 0,
            checkItemsChecked: 0,
            checkItemsEarliestDue: null,
            comments: 0,
            description: false,
            due: null,
            dueComplete: false,
            lastUpdatedByAi: false,
            start: null
        },
        checkItemStates: [],
        closed: false,
        dueComplete: false,
        dateLastActivity: new Date().toISOString(),
        desc: "",
        descData: {
            emoji: {}
        },
        due: null,
        dueReminder: null,
        email: null,
        idBoard: card.idBoard,
        idChecklists: [],
        idList: card.idList,
        idMembers: [],
        idMembersVoted: [],
        idShort: '',// generateShortId(), // Function to generate a short ID
        idAttachmentCover: null,
        labels: [],
        idLabels: [],
        manualCoverAttachment: true,
        name: card.name,
        pos: card.pos, // Default position, can be adjusted
        shortLink: '', // generateShortLink(), // Function to generate a short link
        shortUrl: '', // `https://trello.com/c/${generateShortLink()}`,
        start: null,
        subscribed: false,
        url: '', // `https://trello.com/c/${generateShortLink()}`,
        cover: {
            idAttachment: null,
            color: null,
            idUploadedBackground: null,
            size: '',
            brightness: '',
            scaled: [],
            edgeColor: '',
            sharedSourceUrl: null,
            idPlugin: null
        },
        isTemplate: false,
        cardRole: null
    };
}
