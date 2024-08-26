import { PlusOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import templateCard from "../../assets/svgs/template-card.svg";
import { AddTaskInGroup } from "./AddTaskInGroup";
import { ReactSVG } from "react-svg";
import { useClickOutside } from "../../customHooks/useClickOutside";
import useScrollPercentage from "../../customHooks/useScrollPercentage";

export function GroupFooter({ groupId, addTask, groupRef }) {
  const [footerRef, isAddTaskOpen, setIsAddTaskOpen] = useClickOutside(false);
  const [_, setScrollToPercentage] = useScrollPercentage(groupRef);
  function closeAddTask() {
    setIsAddTaskOpen(false);
  }
  function onBtnClick() {
    setIsAddTaskOpen(true);
    setTimeout(() => {
      setScrollToPercentage(200);
    }, 0);
  }

  return (
    <div className="list-footer" ref={footerRef}>
      {!isAddTaskOpen && (
        <>
          <button className="add-card-btn" onClick={onBtnClick}>
            <PlusOutlined />
            &nbsp;&nbsp;Add a card
          </button>
          <button className="use-template-btn">
            <ReactSVG
              src={templateCard}
              alt="template card"
              className="template-card"
              wrapper="span"
            />
          </button>
        </>
      )}
      {isAddTaskOpen && (
        <AddTaskInGroup
          groupId={groupId}
          closeAddTask={closeAddTask}
          addTask={addTask}
          addToTop={false}
          onBtnClick={onBtnClick}
        />
      )}
    </div>
  );
}
