import { Card } from "antd";
import { GroupFooter } from "./GroupFooter";
import { useState, useEffect, useCallback, useRef } from "react";
import { AddTaskInGroup } from "./AddTaskInGroup";
import { BoardGroupHeader } from "./BoardGroupHeader";
import { TaskPreview } from "../Task/TaskPreview";
import { useClickOutside } from "../../customHooks/useClickOutside";
import { Droppable, Draggable } from "react-beautiful-dnd";
import useScrollPercentage from "../../customHooks/useScrollPercentage";
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
  labelActions,
  isDraggingOverId,
}) {
  const [newTasksAboveInput, setNewTasksAboveInput] = useState([]);
  const [sortedTasks, setSortedTasks] = useState([]);
  const [isTopAddTaskOpen, setIsTopAddTaskOpen] = useState(false);
  const [isBottomAddTaskOpen, setIsBottomAddTaskOpen] = useState(false);
  const [containerRef, isAnyAddTaskOpen, setIsAnyAddTaskOpen] =
    useClickOutside(false);

  const groupRef = useRef();
  const [_, setScrollToPercentage] = useScrollPercentage(groupRef);

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
    <Draggable draggableId={group.id} index={group.pos}>
      {(draggableProvided, snapshot) => (
        <div
          {...draggableProvided.draggableProps}
          ref={draggableProvided.innerRef}
        >
          <div
            className={`board-group-container ${
              snapshot.isDragging ? "dragging" : ""
            }`}
          >
            <Card
              className={`board-group custom-card ${
                isDraggingOverId === group.id ? "draggOver" : ""
              }`}
              ref={containerRef}
            >
              <BoardGroupHeader
                draggableProvided={draggableProvided}
                group={group}
                editGroup={editGroup}
                openAddTask={openTopAddTask}
                archiveGroup={archiveGroup}
                copyGroup={copyGroup}
                moveAllCards={moveAllCards}
                archiveAllCards={archiveAllCards}
                sortGroup={sortGroup}
              />
              <Droppable droppableId={group.id} type="task">
                {(droppableProvided, snapshot) => (
                  <main
                    className={`board-group-main ${
                      snapshot.isDraggingOver ? "dragging-over" : ""
                    } `}
                    ref={(el) => {
                      droppableProvided.innerRef(el);
                      groupRef.current = el;
                    }}
                    {...droppableProvided.droppableProps}
                  >
                    {newTasksAboveInput.map((task) => (
                      <TaskPreview
                        key={task.id}
                        task={task}
                        editTask={editTask}
                        labelActions={labelActions}
                      />
                    ))}
                    {isTopAddTaskOpen && (
                      <AddTaskInGroup
                        groupId={group.id}
                        closeAddTask={onCloseTopAddTask}
                        addTask={addTaskToTop}
                        addToTop={true}
                      />
                    )}
                    {sortedTasks
                      .filter((task) => !newTasksAboveInput.includes(task.id))
                      .map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, dragSnapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`task-preview-container ${
                                dragSnapshot.isDragging ? "dragging" : ""
                              }`}
                              // style={{
                              //   ...provided.draggableProps.style,
                              //   opacity: dragSnapshot.isDragging ? 0.5 : 1,
                              // }}
                            >
                              <TaskPreview
                                key={task.id}
                                task={task}
                                editTask={editTask}
                                labelActions={labelActions}
                                isDragging={dragSnapshot.isDragging}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {isBottomAddTaskOpen && (
                      <AddTaskInGroup
                        groupId={group.id}
                        closeAddTask={onCloseBottomAddTask}
                        addTask={addTask}
                        addToTop={false}
                        onBtnClick={onAddTaskBtnClick}
                        groupRef={groupRef}
                      />
                    )}
                    {isDraggingOverId === group.id &&
                      droppableProvided.placeholder}
                  </main>
                )}
              </Droppable>
              {!isTopAddTaskOpen && !isBottomAddTaskOpen && (
                <GroupFooter
                  groupId={group.id}
                  addTask={addTask}
                  groupRef={groupRef}
                  openBottomAddTask={openBottomAddTask}
                />
              )}
              {!isBottomAddTaskOpen && isTopAddTaskOpen && (
                <div className="group-footer-placeholder"></div>
              )}
            </Card>
          </div>
        </div>
      )}
    </Draggable>
  );
}
