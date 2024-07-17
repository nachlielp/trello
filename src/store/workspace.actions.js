import { boardService } from "../services/board.service.local";
import { workspaceService } from "../services/workspace.service";
import { setBoard } from "./board.actions";
import { store } from "./store";
import {
  EDIT_WORKSPACE,
  SET_BOARDS,
  ADD_BOARD,
  VIEW_BOARD,
} from "./workspace.reducer";

export async function setBoards() {
  const boards = await workspaceService.getAllBoards();
  store.dispatch({ type: SET_BOARDS, boards });
}

export async function viewWorkspaceBoard(boardId) {
  const boards = await workspaceService.getAllBoards();
  const board = boards.find((b) => b.id === boardId);
  store.dispatch({ type: VIEW_BOARD, boardId: board.id });
}

export async function moveCard({
  targetBoardId,
  targetGroupId,
  targetPos,
  task,
}) {
  try {
    const newTask = {
      ...task,
      idBoard: targetBoardId,
      idGroup: targetGroupId,
      pos:
        targetGroupId === task.idGroup && targetPos > task.pos
          ? targetPos + 12111
          : targetPos - 12111,
    };
    const boards = await workspaceService.getAllBoards();
    const sourceBoard = boards.find((b) => b.id === task.idBoard);

    const updatedSourceBoard = {
      ...sourceBoard,
      groups: sourceBoard.groups.map((g) =>
        g.id === task.idGroup
          ? { ...g, tasks: g.tasks.filter((t) => t.id !== task.id) }
          : g
      ),
    };

    const targetBoard =
      task.idBoard === targetBoardId
        ? updatedSourceBoard
        : boards.find((b) => b.id === targetBoardId);

    const updatedTargetBoard = {
      ...targetBoard,
      groups: targetBoard.groups.map((g) =>
        g.id === targetGroupId
          ? {
              ...g,
              tasks: [
                ...g.tasks.map((t) =>
                  t.pos > newTask.pos
                    ? { ...t, pos: t.pos + 12111 }
                    : { ...t, pos: t.pos - 12111 }
                ),
                newTask,
              ],
            }
          : g
      ),
    };
    store.dispatch({ type: EDIT_WORKSPACE, board: updatedTargetBoard });
    if (targetBoardId === task.idBoard) {
      setBoard(updatedTargetBoard);
    } else {
      setBoard(updatedSourceBoard);
      store.dispatch({ type: EDIT_WORKSPACE, board: updatedSourceBoard });
      await boardService.save(updatedSourceBoard);
    }
    await boardService.save(updatedTargetBoard);
  } catch (error) {
    console.log(error);
  }
}

export async function createBoard(board) {
  const newBoard = await boardService.save({ ...board, apdatedAt: Date.now() });
  store.dispatch({ type: ADD_BOARD, board: newBoard });
  return newBoard.id;
}

//Notice, the board action updates the storage, this updates the workspace state
export async function editWorkspaceBoardState(board) {
  store.dispatch({ type: EDIT_WORKSPACE, board: { ...board, closed: true } });
}
