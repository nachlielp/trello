import { boardService } from "../services/board.service.local";
import { workspaceService } from "../services/workspace.service";
import { updateBoard } from "./board.actions";
import { store } from "./store";
import { EDIT_BOARD, SET_BOARDS, ADD_BOARD, VIEW_BOARD } from "./workspace.reducer";

export async function setBoards() {
  const boards = await workspaceService.getAllBoards();
  store.dispatch({ type: SET_BOARDS, boards });
}

export async function viewWorkspaceBoard(boardId) {
  const boards = await workspaceService.getAllBoards();
  const board = boards.find((b) => b.id === boardId);
  store.dispatch({ type: VIEW_BOARD, boardId: board.id });
}

export async function moveCard(details) {
  const boards = await workspaceService.getAllBoards();

  // Find old board and group
  const oldBoard = boards.find((b) => b.id === details.task.idBoard);

  // Remove task from old group
  const updatedGroups = oldBoard.groups.map((g) => {
    if (g.id === details.task.idGroup) {
      return {
        ...g,
        tasks: g.tasks.filter((t) => t.id !== details.task.id),
      };
    }
    return g;
  });

  // Update old board with updated groups
  const updatedOldBoard = {
    ...oldBoard,
    groups: updatedGroups,
  };
  // store.dispatch({ type: EDIT_BOARD, board: updatedOldBoard });
  console.log(updatedOldBoard);
  await boardService.save(updatedOldBoard);

  const findNewBoard = await workspaceService.getAllBoards();

  const newBoard = findNewBoard.find((b) => b.id === details.idBoard);
  const newGroup = newBoard.groups.find((g) => g.id === details.idGroup);

  // Modify task details and update new group tasks
  const modifiedTask = {
    ...details.task,
    pos: details.pos,
    idBoard: details.idBoard,
    idGroup: details.idGroup,
  };
  const modifiedNewTasks = newGroup?.tasks.map((t) => ({
    ...t,
    pos: t.pos >= modifiedTask.pos ? t.pos + 12111 : t.pos,
  }));
  modifiedNewTasks?.push(modifiedTask);

  // Update new group with modified tasks
  const modifiedNewGroup = {
    ...newGroup,
    tasks: modifiedNewTasks,
  };

  // Update new board with modified group
  const modifiedNewBoard = {
    ...newBoard,
    groups: newBoard.groups.map((g) =>
      g.id === details.idGroup ? modifiedNewGroup : g
    ),
  };

  // Save modified boards

  store.dispatch({ type: EDIT_BOARD, board: modifiedNewBoard });
  await boardService.save(modifiedNewBoard);
}

export async function createBoard(board) {
  const newBoard = await boardService.save({ ...board, apdatedAt: Date.now() });
  store.dispatch({ type: ADD_BOARD, board: newBoard });
  return newBoard.id;
}


//Notice, the board action updates the storage, this updates the workspace state
export async function editWorkspaceBoardState(board) {
  store.dispatch({ type: EDIT_BOARD, board: { ...board, closed: true } });
}