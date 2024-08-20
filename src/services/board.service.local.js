import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";
import { userService } from "./user.service";

const STORAGE_KEY = "boards";

export const boardService = {
  // query,
  getById,
  save,
  remove,
  create,
  getByTaskId,
  // editList: editGroup,
  // getEmptyBoard,
  // getDemoBoard,
  // addBoardMsg,
  // updateTask,
  // getTaskEditCmps
};
window.boardSer = boardService;

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
async function getByTaskId(taskId) {
  const boards = await storageService.query(STORAGE_KEY);
  const board = boards?.find((board) =>
    board.groups?.some((group) =>
      group.tasks?.some((task) => task.id === taskId)
    )
  );
  if (!board) {
    return {
      error: `Get failed, cannot find board with task id: ${taskId}`,
      status: 404,
    };
  }
  return board;
}

async function getById(boardId) {
  try {
    const board = await storageService.get(STORAGE_KEY, boardId);
    if (!board) {
      throw `Cannot found board with id ${boardId}`;
    }
    return board;
  } catch (error) {
    console.error("Error getting board by id", error);
    return null;
  }
}

async function remove(boardId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, boardId);
}

async function save(board) {
  var savedBoard;
  if (board.id) {
    savedBoard = await storageService.put(STORAGE_KEY, board);
  } else {
    // Later, owner is set by the backend
    board.owner = userService.getLoggedinUser();
    savedBoard = await storageService.post(STORAGE_KEY, board);
  }
  return savedBoard;
}

async function create(board) {
  return await storageService.post(STORAGE_KEY, board);
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
    group,
  };
}

function _getStatuses() {
  return ["open", "inProgress", "done"];
}

function _toMiniGroup(group) {
  return { id: group.id, title: group.title };
}

function _toMiniTask(task) {
  return { id: task.id, title: task.title };
}

// TEST DATA
// storageService.post(STORAGE_KEY, board).then(savedBoard => console.log('Added board', savedBoard))
