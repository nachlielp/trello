import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { BoardGroup } from "../cmps/Group/BoardGroup";
import {
  loadTestBoardFromStorage,
  addTask,
  addGroup,
  archiveGroup,
  editGroup,
  editTask,
  editLabel,
} from "../store/board.actions";
import { AddGroupBtn } from "../cmps/Group/AddGroupBtn";
import { TaskDetailsModal } from "../cmps/Task/TaskDetailsModal/TaskDetailsModal.jsx";
import { BoardHeader } from "../cmps/BoardHeader/BoardHeader.jsx";
import { useParams } from "react-router";
import { setBoards } from "../store/workspace.actions.js";
import { login } from "../store/user.actions.js";
import useScrollByGrab from "../customHooks/useScrollByGrab.js";

export function BoardIndex() {
  const board = useSelector((state) => state.boardModule.board);
  const [clickedTaskId, setClickedTaskId] = useState();
  const params = useParams();
  const { scrollContainerRef, handlers } = useScrollByGrab();

  useEffect(() => {
    loadTestBoardFromStorage();
    setBoards();
    login();
  }, []);

  useEffect(() => {
    if (params.cardId) {
      setClickedTaskId(params.cardId);
    } else {
      setClickedTaskId(null);
    }
  }, [params]);

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
    const res = await editTask(board.id, task);
  }

  async function onEditLabel(label) {
    const res = await editLabel(board.id, label);
  }

  const sortedGroups = board?.groups
    ?.filter((l) => !l.closed)
    .sort((a, b) => a.pos - b.pos);

  return board.id ? (
    <section className="board-index">
      <div
        className="bg"
        style={{
          backgroundImage: `url(${board.prefs?.backgroundImage})`,
        }}
      >
        {board && <BoardHeader />}
        <main className="board-groups"
         ref={scrollContainerRef}
       {...handlers} >
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
              />
            ))}
          <AddGroupBtn addGroup={onAddGroup} />
        </main>
      </div>
      {/* {clickedTaskId && <TaskDetailsModal taskId={clickedTaskId} />} */}
    </section>
  ) : (
    <h1>Loading...</h1>
  );
}
