import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";
import { userService } from "./user.service";

const STORAGE_KEY = "boards";

export const boardService = {
  getById,
  save,
  remove,
  create,
  getByTaskId,
};
window.boardSer = boardService;

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
    savedBoard = await storageService.post(STORAGE_KEY, board);
  }
  return savedBoard;
}

async function create(board) {
  return await storageService.post(STORAGE_KEY, board);
}
