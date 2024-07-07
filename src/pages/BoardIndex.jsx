import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
  loadBoard,

  loadBoardByTaskId,
} from "../store/board.actions";
import { editUser } from "../store/user.actions";

import { AddGroupBtn } from "../cmps/Group/AddGroupBtn";
import { TaskDetailsModal } from "../cmps/Task/TaskDetailsModal/TaskDetailsModal.jsx";
import { BoardHeader } from "../cmps/BoardHeader/BoardHeader.jsx";
import useScrollByGrab from "../customHooks/useScrollByGrab.js";
import { useParams, useNavigate } from "react-router-dom";

export function BoardIndex() {
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const board = useSelector((state) => state.boardModule.board);
  const user = useSelector((state) => state.userModule.user);
  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {

    async function load() {
      if (params.boardId) {
        const res = await loadBoard(params.boardId);
        if (res?.status === 404) {
          navigate("/");
        }
        setSelectedTaskId(null);
      }
      if (params.cardId) {
        loadBoardByTaskId(params.cardId);
        setSelectedTaskId(params.cardId);
      }
    }
    load();
  }, [params]);

  const { scrollContainerRef, handlers } = useScrollByGrab();

  async function onAddTask(task, groupId) {
    const newTask = {
      ...task,
      idBoard: board.id,
    };
    try {
      await addTask(newTask, groupId);
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
    const res = await archiveGroup(boardId, groupId);
    // console.log("onArchiveGroup", res);
  }

  async function onEditGroup(group) {
    const res = await editGroup(board.id, group);
  }

  async function onEditTask(task) {
    if (task.closed) {
      navigate(`/b/${board.id}`, { replace: true });
    }

    const res = await editTask(task);
  }

  async function onEditLabel(label) {
    const res = await editLabel(board.id, label);
  }

  async function onCopyGroup(group) {
    const res = await copyGroup(board.id, group);
  }

  async function onSortGroup(groupId, sortBy, sortOrder) {
    const res = await sortGroup(board.id, groupId, sortBy, sortOrder);
  }

  function onStarToggle(starredIds) {
    editUser({ ...user, starredBoardIds: starredIds });
  }

  const sortedGroups = board?.groups
    ?.filter((l) => !l.closed)
    .sort((a, b) => a.pos - b.pos);

  return (
    board ? (
      <section className="board-index">
        <div className="bg">
          {board && <BoardHeader board={board} starToggle={onStarToggle} starredBoardIds={user?.starredBoardIds} />}
          <main className="board-groups" ref={scrollContainerRef} {...handlers}>
            {sortedGroups &&
              sortedGroups.map((group) => (
                <BoardGroup
                  key={group.id}
                  group={group}
                  addTask={onAddTask}
                  archiveGroup={() => onArchiveGroup(board.id, group.id)}
                  editGroup={onEditGroup}
                  editTask={onEditTask}
                  editLabel={onEditLabel}
                  copyGroup={onCopyGroup}
                  moveAllCards={moveAllCards}
                  archiveAllCards={archiveAllCards}
                  sortGroup={onSortGroup}
                />
              ))}
            <AddGroupBtn addGroup={onAddGroup} />
          </main>
        </div>
        {selectedTaskId && (
          <TaskDetailsModal
            taskId={selectedTaskId}
            editTask={onEditTask}
            editLabel={onEditLabel}
            onCloseTask={() => setSelectedTaskId(null)}
          />
        )}
      </section>
    ) : (
      <h1>Loading...</h1>
    ));
}
