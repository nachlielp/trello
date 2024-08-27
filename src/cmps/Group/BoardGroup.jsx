import { Card } from "antd";
import { GroupFooter } from "./GroupFooter";
import { useState, useEffect, useCallback, useRef } from "react";
import { AddTaskInGroup } from "./AddTaskInGroup";
import { BoardGroupHeader } from "./BoardGroupHeader";
import { TaskPreview } from "../Task/TaskPreview";
import { useClickOutside } from "../../customHooks/useClickOutside";
import { Droppable, Draggable } from "react-beautiful-dnd";
import useScrollPercentage from "../../customHooks/useScrollPercentage";
import { useSelector } from "react-redux";

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
  const [newTasksAboveInput, setNewTasksAboveInput] = useState([]);
  const [sortedTasks, setSortedTasks] = useState([]);
  const [footerRef, isAddTaskOpen, setIsAddTaskOpen] = useClickOutside(false);
  const groupRef = useRef()

  useEffect(() => {
    if (!isAnyAddTaskOpen) {
      setIsTopAddTaskOpen(false);
      setIsBottomAddTaskOpen(false);
    }
  }, [isAnyAddTaskOpen]);

  useEffect(() => {
    const filteredTasks = group.tasks?.filter((task) => !task.closed) || [];
    const updatedTaskIds = filteredTasks.map((task) => task.id);
    const currentTaskIds = sortedTasks.map((task) => task.id);
    const newTaskIds = updatedTaskIds.filter(
      (taskId) => !currentTaskIds.includes(taskId)
    );
    const newTasks = filteredTasks.filter((task) =>
      newTaskIds.includes(task.id)
    );
    if (isTopAddTaskOpen) {
      setNewTasksAboveInput(newTasks);
    } else {
      setSortedTasks(filteredTasks.sort((a, b) => a.pos - b.pos) || []);
      setNewTasksAboveInput([]);
    }
  }, [group.tasks?.length, group.updatedAt, isAnyAddTaskOpen]);

  function addTaskToTop(task, group) {
    addTask(task, group, newTasksAboveInput.length);
  }

  const openTopAddTask = () => {
    setIsTopAddTaskOpen(true);
    setIsAnyAddTaskOpen(true);
  };

  const onCloseTopAddTask = () => {
    setIsTopAddTaskOpen(false);
    setIsAnyAddTaskOpen(false);
    setNewTasksAboveInput([]);
  };

  const openBottomAddTask = () => {
    setIsBottomAddTaskOpen(true);
    setIsAnyAddTaskOpen(true);
  };

  function onCloseBottomAddTask() {
    setIsBottomAddTaskOpen(false);
    setIsAnyAddTaskOpen(false);
  }

  function onAddTaskBtnClick() {
    openBottomAddTask();
    setTimeout(() => {
      setScrollToPercentage(200);
    }, 0);
  }

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
