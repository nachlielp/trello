import { PlusOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import templateCard from "../../assets/svgs/template-card.svg";
import { AddTaskInGroup } from "./AddTaskInGroup";
import { ReactSVG } from "react-svg";

export function GroupFooter({ groupId, addTask }) {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  function closeAddTask() {
    setIsAddTaskOpen(false);
  }

  const footerRef = useRef(null);
  const handleClickOutside = useCallback(
    (event) => {
      if (footerRef.current && !footerRef.current.contains(event.target)) {
        setIsAddTaskOpen(false);
      }
    },
    [footerRef]
  );

  useEffect(() => {
    if (isAddTaskOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAddTaskOpen, handleClickOutside]);

  return (
    <div className="list-footer" ref={footerRef}>
      {!isAddTaskOpen && (
        <>
          <button
            className="add-card-btn"
            onClick={() => setIsAddTaskOpen(true)}
          >
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
        />
      )}
    </div>
  );
}
