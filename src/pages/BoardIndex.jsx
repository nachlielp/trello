import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BoardHeader } from "../cmps/BoardHeader";
import { BoardGroup } from "../cmps/Group/BoardGroup";
import {
  loadTestBoardFromStorage,
  addTask,
  addGroup,
  archiveGroup,
  editGroup
} from "../store/board.actions";
import { AddGroupBtn } from "../cmps/Group/AddGroupBtn";

export function BoardIndex() {
  const board = useSelector((state) => state.boardModule.board);

  useEffect(() => {
    loadTestBoardFromStorage();
  }, []);


  async function onAddTask(task, groupId) {
    const newTask = {
      ...task,
      idBoard: board.id,
    }
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
    console.log("onAddGroup", res);
  }

  async function onArchiveGroup(boardId, groupId) {
    const res = await archiveGroup(boardId, groupId);
    console.log("onArchiveGroup", res);
  }

  async function onEditGroup(group) {
    const res = await editGroup(board.id, group)
    console.log("onEditGroup", res);
  }

  const sortedGroups = board?.groups?.filter(l => !l.closed).sort((a, b) => a.pos - b.pos);

  return (
    board.id ? <section className="board-index">
      <div
        className="bg"
        style={{
          backgroundImage: `url(${board.prefs?.backgroundImage})`,
        }}
      >
        {board && <BoardHeader />}
        <main className="board-groups">
          {sortedGroups.map((group) => (
            <BoardGroup
              key={group.id}
              group={group}
              addTask={onAddTask}
              archiveGroup={() => onArchiveGroup(board.id, group.id)}
              editGroup={onEditGroup}
            />
          ))}
          <AddGroupBtn addGroup={onAddGroup} />
        </main>
      </div>
    </section>
      : <h1>Loading...</h1>
  );
}
