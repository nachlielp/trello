import { boardService } from "../services/board.service";
import { utilService } from "../services/util.service";
import { store } from "./store";
import { editWorkspaceBoard } from "./workspace.actions";
import {
  SET_BOARD,
  SET_IS_EXPANDED,
  ADD_GROUP,
  EDIT_GROUP,
  EDIT_TASK,
  EDIT_LABEL,
  COPY_GROUP,
  MOVE_ALL_CARDS,
  ARCHIVE_ALL_CARDS,
  SORT_GROUP,
  VIEW_BOARD,
  ADD_LABEL,
  DELETE_LABEL,
} from "./board.reducer";
import { viewWorkspaceBoard } from "./workspace.actions";
import { REMOVE_BOARD } from "./workspace.reducer";
import { loadWorkspaceUsers } from "./user.actions";
import { httpService } from "../services/http.service";

export async function loadBoard(boardId) {
  try {
    const currentBoard = store.getState().boardModule.board;
    if (currentBoard.id === boardId) {
      return currentBoard;
    }
    const boardData = await boardService.getById(boardId);
    if (boardData) {
      store.dispatch({
        type: SET_BOARD,
        board: { ...boardData, updatedAt: new Date().getTime() },
      });
      return boardData;
    } else {
      store.dispatch({
        type: SET_BOARD,
        board: {},
      });
      throw `Cannot found board with id ${boardId}`;
    }
  } catch (err) {
    console.error(err);
  }
}

export async function loadBoardBySocket({ boardId }) {
  const board = await boardService.getById(boardId);
  if (board) {
    store.dispatch({ type: SET_BOARD, board: board });
  }
}

export async function loadBoardByTaskId(taskId) {
  let currentBoard = store.getState().boardModule.board;
  if (!currentBoard.id) {
    currentBoard = await httpService.get(`boards/t/${taskId}`);
    store.dispatch({
      type: SET_BOARD,
      board: currentBoard,
    });
  }
  if (
    currentBoard.groups.some((group) =>
      group.tasks.some((task) => task.id === taskId)
    )
  ) {
    return currentBoard.id;
  }

  const board = await boardService.getByTaskId(taskId);
  if (board.error) {
    return board;
  }
  store.dispatch({
    type: SET_BOARD,
    board: { ...board, updatedAt: new Date().getTime() },
  });
  return board.id;
}
export async function removeBoard(boardId) {
  try {
    store.dispatch({
      type: REMOVE_BOARD,
      boardId: boardId,
    });
    await boardService.remove(boardId);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function viewBoard(boardId) {
  try {
    const board = await boardService.getById(boardId);

    if (!board) return;
    const newBoard = {
      ...board,
      viewedAt: Date.now(),
    };
    const membersIds = board.members.map((m) => m.id);
    loadWorkspaceUsers(membersIds);
    await boardService.save(newBoard);
    viewWorkspaceBoard(boardId);
  } catch (err) {
    console.error(err);
  }
}

export function setBoard(board) {
  if (board) {
    store.dispatch({
      type: SET_BOARD,
      board: { ...board, updatedAt: new Date().getTime() },
    });
  }
}

export function toggleIsExpanded() {
  store.dispatch({
    type: SET_IS_EXPANDED,
    isExpanded: !store.getState().boardModule.isExpanded,
  });
}

export async function addTask(task, user, group, tasksToSkip) {
  try {
    const board = await boardService.getById(task.idBoard);
    const newGroup = { ...group };
    const newTask = utilService.createNewTask(task);
    if (task.addToTop) {
      newTask.pos = tasksToSkip;
      newGroup.tasks.map((t) => {
        if (t.pos >= tasksToSkip) {
          t.pos = t.pos + 1;
        }
        return t;
      });
      newGroup.tasks.splice(tasksToSkip, 0, newTask);
    } else {
      newTask.pos = newGroup.tasks.length;
      newGroup.tasks.push(newTask);
    }

    const newActivity = utilService.createActivity(
      {
        type: "addTask",
        targetId: newTask.id,
        targetName: newTask.name,
        groupName: group.name,
      },
      user
    );

    const newBoard = {
      ...board,
      groups: board.groups?.map((g) => {
        if (g.id === newTask.idGroup) {
          return { ...g, tasks: newGroup.tasks };
        }
        return g;
      }),
      activities: [...board?.activities, newActivity],
      updatedAt: new Date().getTime(),
    };
    await boardService.save(newBoard);
    store.dispatch({ type: SET_BOARD, board: newBoard });
    return newTask;
  } catch (err) {
    console.log("Cannot add task", err);
    throw err;
  }
}

export async function addGroup(group, boardId) {
  try {
    const board = await boardService.getById(boardId);
    const newGroup = utilService.createNewGroup(group);
    newGroup.pos = board.groups.length;
    store.dispatch({ type: ADD_GROUP, group: newGroup });
    const newBoard = {
      ...board,
      groups: [...board.groups, newGroup],
      updatedAt: new Date().getTime(),
    };
    await updateBoard(newBoard);
    return newGroup;
  } catch (err) {
    console.log("Cannot add group", err);
    throw err;
  }
}

export async function archiveGroup(boardId, groupId, user) {
  const board = await boardService.getById(boardId);
  const group = board.groups.find((g) => g.id === groupId);
  store.dispatch({
    type: EDIT_GROUP,
    group: { ...group, closed: true, pos: null },
  });
  const newActivity = utilService.createActivity(
    {
      type: "archiveGroup",
      targetName: group.name,
    },
    user
  );
  const newBoard = {
    ...board,
    groups: board.groups.map((g) => {
      if (g.id === groupId) {
        return { ...g, closed: true, pos: null };
      } else if (g.pos > g.pos) {
        return { ...g, pos: g.pos - 1 };
      }
      return g;
    }),
    activities: [...board?.activities, newActivity],
    updatedAt: new Date().getTime(),
  };
  await updateBoard(newBoard);
  return newBoard;
}

export async function copyGroup(boardId, group, user) {
  const board = await boardService.getById(boardId);
  const newGroupId = utilService.makeId();
  const taskActivitiesParams = [];
  const groupTasks = group.tasks.map((t) => {
    const newTask = {
      ...t,
      id: utilService.makeId(),
      idGroup: newGroupId,
    };
    taskActivitiesParams.push({ taskName: newTask.name, taskId: newTask.id });
    return newTask;
  });

  const newGroup = {
    ...group,
    id: newGroupId,
    pos: group.pos + 1,
    tasks: groupTasks,
  };
  const newGroupActivities = utilService.createActivity(
    {
      type: "archiveGroup",
      targetName: newGroup.name,
    },
    user
  );
  const newTaskActivities = taskActivitiesParams.map((t) => {
    return utilService.createActivity(
      {
        type: "addTask",
        targetId: t.taskId,
        targetName: t.taskName,
        groupName: newGroup.name,
      },
      user
    );
  });
  const updatedGroups = board.groups.map((g) => {
    if (g.pos >= newGroup.pos) {
      return { ...g, pos: g.pos + 1 };
    }
    return g;
  });

  updatedGroups.push(newGroup);

  store.dispatch({ type: COPY_GROUP, groups: updatedGroups });

  const newBoard = {
    ...board,
    groups: updatedGroups,
    activities: [
      ...board?.activities,
      ...newTaskActivities,
      newGroupActivities,
    ],
    updatedAt: new Date().getTime(),
  };
  await updateBoard(newBoard);
}

export async function moveAllCards(
  boardId,
  sourceGroupId,
  targetGroupId,
  user
) {
  const board = await boardService.getById(boardId);
  const sourceGroup = board.groups.find((g) => g.id === sourceGroupId);
  const targetGroup = board.groups.find((g) => g.id === targetGroupId);
  const taskActivitiesInfo = [];
  const newTargetGroup = {
    ...targetGroup,
    tasks: [
      ...(targetGroup?.tasks || []),
      ...(sourceGroup?.tasks?.map((t) => {
        const newTasks = { ...t, idGroup: targetGroupId };
        taskActivitiesInfo.push(
          utilService.createActivity(
            {
              type: "movedTask",
              targetId: t.id,
              targetName: t.name,
              from: sourceGroup.name,
              to: targetGroup.name,
            },
            user
          )
        );
        return newTasks;
      }) || []),
    ],
  };

  const updatedGroups = board.groups.map((g) => {
    if (g.id === sourceGroupId) {
      return { ...g, tasks: [] };
    }
    if (g.id === targetGroupId) {
      return newTargetGroup;
    }
    return g;
  });
  const newBoard = {
    ...board,
    groups: updatedGroups,
    activities: [...board?.activities, ...taskActivitiesInfo],
    updatedAt: new Date().getTime(),
  };
  store.dispatch({
    type: MOVE_ALL_CARDS,
    sourceGroup: { ...sourceGroup, tasks: [] },
    targetGroup: newTargetGroup,
  });
  await updateBoard(newBoard);
}

export async function archiveAllCards(boardId, groupId, user) {
  const board = await boardService.getById(boardId);
  const group = board.groups.find((g) => g.id === groupId);
  const newActivities = group.tasks.map((t) => {
    return utilService.createActivity(
      {
        type: "archiveTask",
        targetId: t.id,
        targetName: t.name,
      },
      user
    );
  });
  const newGroup = {
    ...group,
    tasks: group.tasks.map((t) => ({ ...t, closed: true })),
    updatedAt: new Date().toISOString(),
  };
  store.dispatch({ type: ARCHIVE_ALL_CARDS, group: newGroup });

  const newBoard = {
    ...board,
    groups: board.groups.map((g) => (g.id === groupId ? newGroup : g)),
    activities: [...board?.activities, ...newActivities],
    updatedAt: new Date().getTime(),
  };
  await boardService.save(newBoard);
}

export async function editGroup(boardId, group) {
  store.dispatch({ type: EDIT_GROUP, group: group });
  const board = await boardService.getById(boardId);
  const newBoard = {
    ...board,
    groups: board.groups.map((g) => (g.id === group.id ? group : g)),
    updatedAt: new Date().getTime(),
  };
  await boardService.save(newBoard);
  return group;
}

export async function sortGroup(boardId, groupId, sortBy, sortOrder) {
  const board = await boardService.getById(boardId);
  const group = board.groups.find((g) => g.id === groupId);
  let newGroup = {};
  if (sortBy === "name") {
    newGroup = {
      ...group,
      tasks: group.tasks.sort((a, b) => a.name.localeCompare(b.name)),
    };
  } else if (sortBy === "createdAt") {
    newGroup = {
      ...group,
      tasks: group.tasks.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      ),
    };
  }
  if (sortOrder === "desc") {
    newGroup.tasks.reverse();
  }
  newGroup.tasks.forEach((task, index) => {
    task.pos = index;
  });
  newGroup.updatedAt = new Date().toISOString();
  const newBoard = {
    ...board,
    groups: board.groups.map((g) =>
      g.id === groupId ? { ...g, sortBy, sortOrder } : g
    ),
    updatedAt: new Date().getTime(),
  };
  store.dispatch({ type: SORT_GROUP, group: newGroup });
  await boardService.save(newBoard);
}

export async function editTask(task) {
  store.dispatch({ type: EDIT_TASK, task: task });
  const board = await boardService.getById(task.idBoard);
  const newBoard = {
    ...board,
    groups: board.groups.map((g) =>
      g.id === task.idGroup
        ? { ...g, tasks: g.tasks.map((t) => (t.id === task.id ? task : t)) }
        : g
    ),
    updatedAt: new Date().getTime(),
  };
  await boardService.save(newBoard);
  console.log("newBoard", newBoard);
  return newBoard;
}

export async function updateBoard(newBoard) {
  try {
    store.dispatch({
      type: SET_BOARD,
      board: { ...newBoard, updatedAt: new Date().getTime() },
    });

    newBoard.updatedAt = Date.now();
    await editWorkspaceBoard(newBoard);
  } catch (err) {
    console.error("Cannot update board", err);
    throw err;
  }
}

export async function getItemById(boardId, taskId) {
  const board = await boardService.getById(boardId);
  let task;
  for (const group of board.groups) {
    task = group.tasks.find((t) => t.id === taskId);
    if (task) break;
  }
  return task;
}

export async function getBoardLabels(boardId) {
  const board = await boardService.getById(boardId);
  return board.labels;
}

export async function editLabel(boardId, label) {
  store.dispatch({ type: EDIT_LABEL, label: label });
  const board = await boardService.getById(boardId);
  const newBoard = {
    ...board,
    labels: board.labels.map((l) => (l.id === label.id ? label : l)),
    updatedAt: new Date().getTime(),
  };
  await boardService.save(newBoard);
  return newBoard;
}

export async function createLabel(boardId, task, label) {
  const newLabel = utilService.createNewLabel(label.name, label.color);
  store.dispatch({ type: ADD_LABEL, label: newLabel });
  store.dispatch({
    type: EDIT_TASK,
    task: { ...task, idLabels: [...task.idLabels, newLabel.id] },
  });
  const board = await boardService.getById(boardId);
  const newBoard = {
    ...board,
    labels: [...board.labels, newLabel],
    groups: board.groups.map((g) =>
      g.id === task.idGroup
        ? {
            ...g,
            tasks: g.tasks.map((t) =>
              t.id === task.id
                ? { ...task, idLabels: [...task.idLabels, newLabel.id] }
                : t
            ),
          }
        : g
    ),
    updatedAt: new Date().getTime(),
  };
  await boardService.save(newBoard);
  return newBoard;
}

export async function deleteLabel(boardId, labelId) {
  const board = await boardService.getById(boardId);
  const newBoard = {
    ...board,
    labels: board.labels.filter((l) => l.id !== labelId),
    groups: board.groups.map((g) => ({
      ...g,
      tasks: g.tasks.map((t) => ({
        ...t,
        idLabels: t.idLabels.filter((id) => id !== labelId),
      })),
    })),
    updatedAt: new Date().getTime(),
  };
  store.dispatch({ type: DELETE_LABEL, labelId: labelId });
  await boardService.save(newBoard);
  return newBoard;
}

export async function dragGroup(dragGroupEvent, board) {
  const { boardId, groupId, sourceIndex, destinationIndex } = dragGroupEvent;

  const updatedGroups = Array.from(board.groups);
  const [reorderedGroup] = updatedGroups.splice(sourceIndex, 1);
  updatedGroups.splice(destinationIndex, 0, reorderedGroup);

  const newGroups = updatedGroups.map((group, index) => ({
    ...group,
    pos: index,
  }));

  const newBoard = {
    ...board,
    groups: newGroups,
    updatedAt: new Date().getTime(),
  };

  store.dispatch({ type: SET_BOARD, board: newBoard });
  await boardService.save(newBoard);
  return newBoard;
}

export async function moveTask(moveTaskEvent, board, user) {
  const {
    sourceGroupId,
    destinationGroupId,
    taskId,
    sourceIndex,
    destinationIndex,
  } = moveTaskEvent;

  const sourceGroup = board.groups.find((g) => g.id === sourceGroupId);
  if (!sourceGroup) {
    console.error(`Source group ${sourceGroupId} not found`);
    return board;
  }

  const task = sourceGroup.tasks.find((t) => t.id === taskId);
  if (!task) {
    console.error(`Task ${taskId} not found in group ${sourceGroupId}`);
    return board;
  }

  const newTask = {
    ...task,
    idGroup: destinationGroupId,
    pos: destinationIndex,
  };

  let newBoard = {
    ...board,
    groups: [...board.groups],
  };

  if (sourceGroupId === destinationGroupId) {
    newBoard.groups = newBoard.groups.map((g) => {
      if (g.id === sourceGroupId) {
        let newTasks = g.tasks.filter((t) => t.id !== taskId);

        if (destinationIndex > sourceIndex) {
          newTasks = newTasks.map((t) => {
            if (t.pos > sourceIndex && t.pos <= destinationIndex)
              return { ...t, pos: t.pos - 1 };
            return t;
          });
        } else {
          newTasks = newTasks.map((t) => {
            if (t.pos >= destinationIndex && t.pos < sourceIndex)
              return { ...t, pos: t.pos + 1 };
            return t;
          });
        }
        newTasks.splice(destinationIndex, 0, newTask);
        return { ...g, tasks: newTasks, updatedAt: new Date().toISOString() };
      }
      return g;
    });
  } else {
    newBoard.groups = newBoard.groups.map((g) => {
      if (g.id === sourceGroupId) {
        return {
          ...g,
          tasks: g.tasks
            .filter((t) => t.id !== taskId)
            .map((t) => {
              if (t.pos > sourceIndex) return { ...t, pos: t.pos - 1 };
              return t;
            }),
          updatedAt: new Date().toISOString(),
        };
      }
      if (g.id === destinationGroupId) {
        let newTasks = [...g.tasks]
          .sort((a, b) => a.pos - b.pos)
          .map((t) => {
            if (t.pos >= destinationIndex) return { ...t, pos: t.pos + 1 };
            return t;
          });
        newTasks.splice(destinationIndex, 0, newTask);
        return { ...g, tasks: newTasks, updatedAt: new Date().toISOString() };
      }
      return g;
    });
  }
  if (sourceGroup.id !== destinationGroupId) {
    const moveActivity = utilService.createActivity(
      {
        type: "movedTask",
        targetId: task.id,
        targetName: task.name,
        from: sourceGroup.name,
        to: board.groups.find((g) => g.id === destinationGroupId).name,
      },
      user
    );

    newBoard.activities.push(moveActivity);
  }
  store.dispatch({
    type: SET_BOARD,
    board: { ...newBoard, updatedAt: new Date().toISOString() },
  });
  await boardService.save(newBoard);
}
