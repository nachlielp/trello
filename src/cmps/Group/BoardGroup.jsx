import { Card } from "antd";
import { GroupFooter } from "./GroupFooter";
import { useState, useEffect, useCallback, useRef } from "react";
import { AddTaskInGroup } from "./AddTaskInGroup";
import { BoardGroupHeader } from "./BoardGroupHeader";
import { TaskPreview } from "../Task/TaskPreview";
import { useClickOutside } from "../../customHooks/useClickOutside";
import { Droppable, Draggable } from "react-beautiful-dnd";

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
}) {
  const [newTasksAboveInput, setNewTasksAboveInput] = useState([]);
  const [sortedTasks, setSortedTasks] = useState([]);
  const [footerRef, isAddTaskOpen, setIsAddTaskOpen] = useClickOutside(false);
  const groupRef = useRef();

  const taskPositions = group.tasks?.map((task) => task.pos).join(",") || "";

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
    if (isAddTaskOpen) {
      setNewTasksAboveInput(newTasks);
    } else {
      setSortedTasks(filteredTasks.sort((a, b) => a.pos - b.pos) || []);
      setNewTasksAboveInput([]);
    }
  }, [group.tasks?.length, taskPositions]);

  const openAddTask = () => {
    setIsAddTaskOpen(true);
  };

  function addTaskToTop(task, group) {
    addTask(task, group, newTasksAboveInput.length);
  }

  return (
    <Draggable draggableId={group.id} index={group.pos}>
      {(draggableProvided) => (
        <div
          {...draggableProvided.draggableProps}
          ref={draggableProvided.innerRef}
        >
          <Droppable droppableId={group.id} type="task">
            {(droppableProvided, snapshot) => (
              <div
                className={`group ${
                  snapshot.isDraggingOver ? "dragging-over" : ""
                }`}
              >
                <section className="board-group-container">
                  <Card className="board-group custom-card" ref={footerRef}>
                    <BoardGroupHeader
                      draggableProvided={draggableProvided}
                      group={group}
                      editGroup={editGroup}
                      openAddTask={openAddTask}
                      archiveGroup={archiveGroup}
                      copyGroup={copyGroup}
                      moveAllCards={moveAllCards}
                      archiveAllCards={archiveAllCards}
                      sortGroup={sortGroup}
                    />
                    <main
                      className="board-group-main"
                      ref={droppableProvided.innerRef}
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
                      {isAddTaskOpen && (
                        <AddTaskInGroup
                          groupId={group.id}
                          closeAddTask={() => setIsAddTaskOpen(false)}
                          addTask={addTaskToTop}
                          addToTop={true}
                        />
                      )}

                      {sortedTasks
                        .filter((task) => !newTasksAboveInput.includes(task.id))
                        .map((task) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={task.pos}
                          >
                            {(provided, dragSnapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  opacity: dragSnapshot.isDragging ? 0.5 : 1,
                                }}
                              >
                                <TaskPreview
                                  key={task.id}
                                  task={task}
                                  editTask={editTask}
                                  labelActions={labelActions}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {droppableProvided.placeholder}
                    </main>
                    {!isAddTaskOpen && (
                      <GroupFooter
                        groupId={group.id}
                        addTask={addTask}
                        groupRef={groupRef}
                      />
                    )}
                  </Card>
                </section>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
