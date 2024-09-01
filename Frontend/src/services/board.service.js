// import { storageService } from "./async-storage.service";
import { httpService } from "./http.service";

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
    //TODO filter boards by taskId in the server!!!!
    const boards = await httpService.get("boards");
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
    const board = await httpService.get(`boards/${boardId}`);
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
  await httpService.delete(`boards/${boardId}`);
}

async function save(board) {
  var savedBoard;
  try {
    if (board.id) {
      savedBoard = await httpService.put("boards", board);
    } else {
      savedBoard = await httpService.post("boards", board);
    }
    return savedBoard;
  } catch (err) {
    console.log(err);
  }
}
