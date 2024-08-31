import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";
import { userService } from "./user.service";

const STORAGE_KEY = "boards";

export const boardService = {
  getById,
  save,
  remove,
  getByTaskId,
};
window.boardSer = boardService;

async function getByTaskId(taskId) {
  try {
    const boards = await storageService.query(STORAGE_KEY);
    const board = boards?.find((board) =>
      board.groups?.some((group) =>
        group.tasks?.some((task) => task.id === taskId)
      )
    );
    if (!board) {
      throw `Get failed, cannot find board with task id: ${taskId}`;
    }
    return board;
  } catch (err) {
    console.log(err);
    throw `Get failed, cannot find board by task id: ${err}`;
  }
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
    throw `Cannot found board with id ${boardId}`;
  }
}

async function remove(boardId) {
  await storageService.remove(STORAGE_KEY, boardId);
}

async function save(board) {
  var savedBoard;
  if (board.id) {
    savedBoard = await storageService.put(STORAGE_KEY, board);
  } else {
    console.log(board);
    // Later, owner is set by the backend
    savedBoard = await storageService.post(STORAGE_KEY, board);
  }
  return savedBoard;
}
