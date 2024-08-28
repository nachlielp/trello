import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { BoardGroup } from "../cmps/Group/BoardGroup";
import {
  addTask,
  addGroup,
  archiveGroup,
  editGroup,
  editTask,
  editLabel,
  copyGroup,
  moveAllCards,
  archiveAllCards,
  sortGroup,
  dragGroup,
  createLabel,
  deleteLabel,
  updateBoard,
  moveTask,
  loadBoard,
} from "../store/board.actions";
import { editUser } from "../store/user.actions";

import { AddGroupBtn } from "../cmps/Group/AddGroupBtn";
import { TaskDetailsModal } from "../cmps/Task/TaskDetailsModal/TaskDetailsModal.jsx";
import { BoardHeader } from "../cmps/BoardHeader/BoardHeader.jsx";
import useScrollByGrab from "../customHooks/useScrollByGrab.js";
import {
  useParams,
  useNavigate,
  useOutletContext,
  Await,
} from "react-router-dom";
import { utilService } from "../services/util.service.js";
import { background } from "@cloudinary/url-gen/qualifiers/focusOn";

export function BoardIndex() {
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isDraggingOverId, setIsDraggingOverId] = useState(null);
  const board = useSelector((state) => state.boardModule.board);
  const user = useSelector((state) => state.userModule.user);
  const navigate = useNavigate();
  const outletProps = useOutletContext();
  const params = useParams();

  useEffect(() => {
    async function load() {
      if (params.cardId) {
        setSelectedTaskId(params.cardId);
      }

      if (params.link) {
        if (
          board.invLink !== "" &&
          params.link === board.invLink &&
          !board.members.some((m) => m.id === user.id)
        ) {
          await updateBoard({
            ...board,
            members: [
              ...board.members,
              { id: user.id, permissionStatus: "member" },
            ],
          });
        }
        history.replaceState(null, "", `/b/${board.id}`);
      }
    }
    load();
  }, [params]);

  const { scrollContainerRef, handlers } = useScrollByGrab();

  async function onAddTask(task, group, tasksToSkip) {
    const newTask = {
      ...task,
      idBoard: board.id,
    };
    try {
      await addTask(newTask, user, group, tasksToSkip);
    } catch (error) {
      console.log("onAddCard", error);
    }
  }

  async function onAddGroup(name) {
    const group = {
      name: name,
    };
    const res = await addGroup(group, board.id);
    // console.log("onAddGroup", res);
  }

  async function onArchiveGroup(boardId, groupId) {
    const res = await archiveGroup(boardId, groupId, user);
  }

  async function onEditGroup(group) {
    const res = await editGroup(board.id, group);
  }

  async function onEditTask(task) {
    console.log("onEditTask", task);
    if (task.closed) {
      const newActivity = utilService.createActivity(
        {
          type: "archiveTask",
          targetId: task.id,
          targetName: task.name,
        },
        user
      );
      await editTask(task);
      await updateBoard({
        ...board,
        groups: board.groups.map((g) =>
          g.id === task.idGroup
            ? { ...g, tasks: g.tasks.map((t) => (t.id === task.id ? task : t)) }
            : g
        ),
        activities: [...board?.activities, newActivity],
      });
      setSelectedTaskId(null);
      navigate(`/b/${task.idBoard}`);
    } else {
      const res = await editTask(task);
    }
    loadBoard(board.id);
  }

  async function onCopyGroup(group) {
    const res = await copyGroup(board.id, group, user);
  }

  async function onSortGroup(groupId, sortBy, sortOrder) {
    const res = await sortGroup(board.id, groupId, sortBy, sortOrder);
  }

  function onStarToggle(starredIds) {
    editUser({ ...user, starredBoardIds: starredIds });
  }

  async function onLabelAction(action, label, task) {
    if (action === "edit") {
      editLabel(board.id, label);
    }
    if (action === "delete") {
      deleteLabel(board.id, label.id);
    }
    if (action === "create") {
      createLabel(board.id, task, label);
    }
  }

  async function editBoard(changes) {
    await updateBoard({ ...board, ...changes });
  }

  const sortedGroups = board?.groups
    ?.filter((l) => !l.closed)
    .sort((a, b) => a.pos - b.pos);

  function onDragStart(result) {
    setIsDraggingOverId(null);
  }

  function onDragUpdate(result) {
    if (result?.destination?.droppableId !== "board") {
      setIsDraggingOverId(result?.destination?.droppableId);
    }
  }

  async function onDragEnd(result) {
    setIsDraggingOverId(null);
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "group") {
      const dragGroupEvent = {
        boardId: board.id,
        groupId: draggableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      };
      await dragGroup(dragGroupEvent, board);
    } else if (type === "task") {
      const dragTaskEvent = {
        boardId: board.id,
        sourceGroupId: source.droppableId,
        destinationGroupId: destination.droppableId,
        taskId: draggableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      };
      await moveTask(dragTaskEvent, board, user);
    }
  }

  return board.id ? (
    <section className="board-index">
      <div className="bg">
        {board && (
          <BoardHeader
            setOpenBoardMenu={outletProps?.setOpenBoardMenu}
            openBoardMenu={outletProps?.openBoardMenu}
            starToggle={onStarToggle}
            starredBoardIds={user?.starredBoardIds}
            showBtn={outletProps?.showBtn}
            setShowBtn={outletProps?.setShowBtn}
          />
        )}
        <DragDropContext
          onDragStart={onDragStart}
          onDragUpdate={onDragUpdate}
          onDragEnd={onDragEnd}
        >
          <Droppable
            droppableId="board"
            direction="horizontal"
            type="group"
            className="droppable-board"
          >
            {(provided) => (
              <main
                className="board-groups"
                ref={(el) => {
                  provided.innerRef(el);
                  scrollContainerRef.current = el;
                }}
                {...provided.droppableProps}
                {...handlers}
              >
                {sortedGroups &&
                  sortedGroups.map((group) => (
                    <BoardGroup
                      key={group.id}
                      group={group}
                      addTask={onAddTask}
                      archiveGroup={() => onArchiveGroup(board.id, group.id)}
                      editGroup={onEditGroup}
                      editTask={onEditTask}
                      copyGroup={onCopyGroup}
                      moveAllCards={moveAllCards}
                      archiveAllCards={archiveAllCards}
                      sortGroup={onSortGroup}
                      labelActions={onLabelAction}
                      isDraggingOverId={isDraggingOverId}
                    />
                  ))}
                {provided.placeholder}
                <AddGroupBtn addGroup={onAddGroup} />
              </main>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {selectedTaskId && (
        <TaskDetailsModal
          taskId={selectedTaskId}
          editTask={onEditTask}
          onCloseTask={() => setSelectedTaskId(null)}
          labelActions={onLabelAction}
          board={board}
          editBoard={editBoard}
          closeTask={() => setSelectedTaskId(null)}
          addTask={addTask}
        />
      )}
    </section>
  ) : (
    <h1>Loading...</h1>
  );
}
