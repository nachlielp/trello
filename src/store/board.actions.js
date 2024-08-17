import { boardService } from "../services/board.service.local";
import { utilService } from "../services/util.service";
import { memberService } from "../services/members.service.local";
import { store } from "./store";
import { editWorkspaceBoard } from "./workspace.actions";
import {
  SET_MEMBERS,
  SET_BOARD,
  SET_IS_EXPANDED,
  ADD_TASK,
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
import { setBoards, viewWorkspaceBoard } from "./workspace.actions";
import { EDIT_WORKSPACE } from "./workspace.reducer";

// export async function loadTrelloDataFromSource() {
//   try {
//     const listsData = await fetchListsFromTrello('dL2ehGo7');
//     store.dispatch({ type: SET_LISTS, lists: listsData })
//     const allCards = [];
//     for (const list of listsData) {
//       const cardsData = await fetchCardsFromTrello(list.id);
//       if (cardsData.length > 0) {
//         allCards.push(...cardsData);
//       }
//     }
//     store.dispatch({ type: SET_CARDS, cards: allCards })
//     const membersData = await fetchMembersFromTrello();
//     store.dispatch({ type: SET_MEMBERS, members: membersData })
//     const boardData = await fetchBoardFromTrello();
//     store.dispatch({ type: SET_BOARD, board: boardData })
//   } catch (err) {
//     console.log('Error fetching listsData: ', err)
//   }
// }

export async function loadBoard(boardId) {
  const boardData = await boardService.getById(boardId);
  store.dispatch({
    type: SET_BOARD,
    board: { ...boardData, apdatedAt: new Date().getTime() },
  });
  return boardData;
}

export async function loadBoardByTaskId(taskId) {
  const board = await boardService.getByTaskId(taskId);
  if (board.error) {
    return board;
  }
  store.dispatch({
    type: SET_BOARD,
    board: { ...board, apdatedAt: new Date().getTime() },
  });
  return board.id;
}

export async function viewBoard(boardId) {
  const board = await boardService.getById(boardId);
  const newBoard = {
    ...board,
    viewedAt: Date.now(),
  };
  await boardService.save(newBoard);
  store.dispatch({
    type: VIEW_BOARD,
    board: newBoard,
  });
  viewWorkspaceBoard(boardId);
}

export function setBoard(board) {
  store.dispatch({
    type: SET_BOARD,
    board: { ...board, apdatedAt: new Date().getTime() },
  });
}

export function toggleIsExpanded() {
  store.dispatch({
    type: SET_IS_EXPANDED,
    isExpanded: !store.getState().boardModule.isExpanded,
  });
}

export async function addTask(task, user, group) {
  try {
    const newTask = utilService.createNewTask(task);
    store.dispatch({ type: ADD_TASK, task: newTask });
    const board = await boardService.getById(task.idBoard);
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
          return { ...g, tasks: [...(g.tasks || []), newTask] };
        }
        return g;
      }),
      activities: [...board?.activities, newActivity],
      apdatedAt: new Date().getTime(),
    };
    await updateBoard(newBoard);
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
    newGroup.pos = board.groups.length + 1;
    store.dispatch({ type: ADD_GROUP, group: newGroup });
    const newBoard = {
      ...board,
      groups: [...board.groups, newGroup],
      apdatedAt: new Date().getTime(),
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
    apdatedAt: new Date().getTime(),
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
    apdatedAt: new Date().getTime(),
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
              from: sortGroup.name,
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
    apdatedAt: new Date().getTime(),
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
  };
  store.dispatch({ type: ARCHIVE_ALL_CARDS, group: newGroup });

  const newBoard = {
    ...board,
    groups: board.groups.map((g) => (g.id === groupId ? newGroup : g)),
    activities: [...board?.activities, ...newActivities],
    apdatedAt: new Date().getTime(),
  };
  await boardService.save(newBoard);
}

export async function editGroup(boardId, group) {
  store.dispatch({ type: EDIT_GROUP, group: group });
  const board = await boardService.getById(boardId);
  const newBoard = {
    ...board,
    groups: board.groups.map((g) => (g.id === group.id ? group : g)),
    apdatedAt: new Date().getTime(),
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
  const STARTING_POS = 87654;
  newGroup.tasks.forEach((task, index) => {
    task.pos = STARTING_POS * (1 + index);
  });
  const newBoard = {
    ...board,
    groups: board.groups.map((g) =>
      g.id === groupId ? { ...g, sortBy, sortOrder } : g
    ),
    apdatedAt: new Date().getTime(),
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
    apdatedAt: new Date().getTime(),
  };
  await boardService.save(newBoard);
  return task;
}

export async function updateBoard(newBoard) {
  try {
    store.dispatch({
      type: SET_BOARD,
      board: { ...newBoard, apdatedAt: new Date().getTime() },
    });

    newBoard.apdatedAt = Date.now();
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
    apdatedAt: new Date().getTime(),
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
    apdatedAt: new Date().getTime(),
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
    apdatedAt: new Date().getTime(),
  };
  store.dispatch({ type: DELETE_LABEL, labelId: labelId });
  await boardService.save(newBoard);
  return newBoard;
}

// export async function addCards(boardId, cards) {
//     try {
//         store.dispatch(getCmdAddCards(cards))
//     } catch (err) {
//         console.log('Cannot add cards', err)
//         throw err
//     }
// }
// export async function removeCard(boardId, cardId) {
//     try {
//         await boardService.removeCard(boardId, cardId)
//         store.dispatch(getCmdRemoveCard(cardId))
//     } catch (err) {
//         console.log('Cannot remove card', err)
//         throw err
//     }
// }

// export async function updateCard(boardId, card) {
//     try {
//         const savedCard = await boardService.updateCard(boardId, card)
//         console.log('Updated card', savedCard)
//         store.dispatch(getCmdUpdateCard(savedCard))
//         return savedCard
//     } catch (err) {
//         console.log('Cannot update card', err)
//         throw err
//     }
// }

// export function addLists(lists) {
//     try {
//         store.dispatch({ type: SET_LISTS, lists })
//     } catch (err) {
//         console.log('Cannot add lists', err)
//         throw err
//     }
// }
// export function removeLists(lists) {
//     try {
//         store.dispatch(getCmdRemoveLists(lists))
//     } catch (err) {
//         console.log('Cannot remove lists', err)
//         throw err
//     }
// }

// export function updateList(list) {
//     try {
//         store.dispatch(getCmdUpdateList(list))
//     } catch (err) {
//         console.log('Cannot update list', err)
//         throw err
//     }
// }

// export function addMembers(members) {
//     try {
//         store.dispatch(getCmdAddMembers(members))
//     } catch (err) {
//         console.log('Cannot add members', err)
//         throw err
//     }
// }

// Command Creators:
function getCmdRemoveBoard(boardId) {
  try {
    store.dispatch(getCmdRemoveBoard(boardId));
  } catch (err) {
    console.log("Cannot remove board", err);
    throw err;
  }
}

function getCmdAddBoard(board) {
  try {
    store.dispatch(getCmdAddBoard(board));
  } catch (err) {
    console.log("Cannot add board", err);
    throw err;
  }
}

function getCmdUpdateBoard(board) {
  try {
    store.dispatch(getCmdUpdateBoard(board));
  } catch (err) {
    console.log("Cannot update board", err);
    throw err;
  }
}

function getCmdSetBoards(boards) {
  try {
    store.dispatch(getCmdSetBoards(boards));
  } catch (err) {
    console.log("Cannot set boards", err);
    throw err;
  }
}

function getCmdSetBoard(board) {
  try {
    store.dispatch(getCmdSetBoard(board));
  } catch (err) {
    console.log("Cannot set board", err);
    throw err;
  }
}

function getCmdAddBoardMsg(msg) {
  try {
    store.dispatch(getCmdAddBoardMsg(msg));
  } catch (err) {
    console.log("Cannot add board msg", err);
    throw err;
  }
}

function getCmdUpdateTask(groupId, task, activity) {
  try {
    store.dispatch(getCmdUpdateTask(groupId, task, activity));
  } catch (err) {
    console.log("Cannot update task", err);
    throw err;
  }
}

// unitTestActions()
async function unitTestActions() {
  await loadBoards();
  await addBoard(boardService.getEmptyBoard());
  await updateBoard({
    _id: "m1oC7",
    title: "Board-Good",
  });
  await removeBoard("m1oC7");
}
