import { boardService } from "../services/board.service.local";
import { workspaceService } from "../services/workspace.service";
import { store } from "./store";
import { EDIT_BOARD, SET_BOARDS } from "./workspace.reducer";

export async function setBoards() {
  console.log("setBoards");
  const boards = await workspaceService.getAllBoards();
  store.dispatch({ type: SET_BOARDS, boards });
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
  await boardService.save(updatedOldBoard);

  const newBoard = boards.find((b) => b.id === details.idBoard);

  const newGroup = newBoard.groups.find((g) => g.id === details.idGroup);

  // Modify task details and update new group tasks
  const modifiedTask = {
    ...details.task,
    pos: details.pos,
    idBoard: details.idBoard,
    idGroup: details.idGroup,
  };
  const modifiedNewTasks = newGroup.tasks.map((t) => ({
    ...t,
    pos: t.pos >= modifiedTask.pos ? t.pos + 12111 : t.pos,
  }));
  modifiedNewTasks.push(modifiedTask);

  // Update new group with modified tasks
  const modifiedNewGroup = {
    ...newGroup,
    tasks: modifiedNewTasks,
  };

  // Update new board with modified group
  const modifiedNewBoard = {
    ...updatedOldBoard,
    groups: updatedOldBoard.groups.map((g) =>
      g.id === details.idGroup ? modifiedNewGroup : g
    ),
  };

  // Save modified boards
  console.log(modifiedNewBoard);
  store.dispatch({ type: EDIT_BOARD, board: modifiedNewBoard });
  await boardService.save(modifiedNewBoard);
}
