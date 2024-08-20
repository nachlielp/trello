import { Card } from "antd";
import { GroupFooter } from "./GroupFooter";
import { useState, useEffect, useCallback, useRef } from "react";
import { AddTaskInGroup } from "./AddTaskInGroup";
import { BoardGroupHeader } from "./BoardGroupHeader";
import { TaskPreview } from "../Task/TaskPreview";
import { useClickOutside } from "../../customHooks/useClickOutside";

//TODO put add new task in array of sorted tasks based on position
export function BoardGroup({
  group,
  addTask,
  archiveGroup,
  editGroup,
  editTask,
  copyGroup,
  moveAllCards,
  archiveAllCards,
  sortGroup,
  labelActions
}) {
  const [newTaskIds, setNewTaskIds] = useState([]);
  const [firstTaskPos, setFirstTaskPos] = useState(null);
  const [lastTaskPos, setLastTaskPos] = useState(null);
  const [sortedTasks, setSortedTasks] = useState([]);
  const [footerRef, isAddTaskOpen, setIsAddTaskOpen] = useClickOutside(false);
  const groupRef = useRef()

  useEffect(() => {
    const filteredTasks = group.tasks?.filter((task) => !task.closed) || [];
    setSortedTasks(filteredTasks.sort((a, b) => a.pos - b.pos) || []);
    setNewTaskIds(
      filteredTasks
        .filter((task) => task.pos < firstTaskPos)
        .map((task) => task.id) || []
    );
  }, [group.tasks]);

  useEffect(() => {
    const filteredTasks = group.tasks?.filter((task) => !task.closed) || [];
    const sortedTasks = filteredTasks.sort((a, b) => a.pos - b.pos) || [];
    if (sortedTasks.length > 0) {
      setFirstTaskPos(sortedTasks[0].pos);
      setLastTaskPos(sortedTasks[sortedTasks.length - 1].pos);
    }
  }, []);

  useEffect(() => {
    const filteredTasks = group.tasks?.filter((task) => !task.closed) || [];
    const sortedTasks = filteredTasks.sort((a, b) => a.pos - b.pos) || [];
    if (sortedTasks.length > 0) {
      setFirstTaskPos(sortedTasks[0].pos);
      setLastTaskPos(sortedTasks[sortedTasks.length - 1].pos);
    }
    setNewTaskIds(
      filteredTasks
        .filter((task) => task.pos < firstTaskPos)
        .map((task) => task.id) || []
    );
  }, [isAddTaskOpen]);

  const openAddTask = () => {
    setIsAddTaskOpen(true);
  };

  return (
    <section className="board-group-container">

      <Card className="board-group custom-card" ref={footerRef}>
        <BoardGroupHeader
          group={group}
          editGroup={editGroup}
          openAddTask={openAddTask}
          archiveGroup={archiveGroup}
          copyGroup={copyGroup}
          moveAllCards={moveAllCards}
          archiveAllCards={archiveAllCards}
          sortGroup={sortGroup}
        />
        <main className="board-group-main" ref={groupRef}>
          {newTaskIds.map((taskId) => (
            <TaskPreview
              key={taskId}
              task={group.tasks.find((task) => task.id === taskId)}
              labelActions={labelActions}
            />
          ))}
          {isAddTaskOpen && (
            <AddTaskInGroup
              groupId={group.id}
              closeAddTask={() => setIsAddTaskOpen(false)}
              addTask={addTask}
              addToTop={true}
            />
          )}
          {sortedTasks
            .filter((task) => !newTaskIds.includes(task.id))
            .map((task) =>
              <TaskPreview
                key={task.id}
                task={task}
                editTask={editTask}
                labelActions={labelActions}
              />
            )}
        </main>
        {!isAddTaskOpen && <GroupFooter groupId={group.id} addTask={addTask} groupRef={groupRef}/>}
      </Card>
    </section>
  );
}
