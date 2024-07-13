import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../../customHooks/useClickOutside";
import { useEffectUpdate } from "../../customHooks/useEffectUpdate";
import { CloseOutlined } from "@ant-design/icons";

export function NameInput({
  onPressEnter,
  value = "",
  placeholder = "",
  onSubmit,
  expandInputWidth = true,
  maxRows = 1,
  minRows = 1,
  className,
  inputStatus,
  onChange,
  inputIsOpen = false,
  autoSelect = true,
  maxLength = 30,
  withButtons = false,
  addButtons = [],
  ...other
}) {
  const [sectionRef, isChangeable, setIsChangeable] = useClickOutside(false);
  const [newName, setNewName] = useState(value);
  const [customWidth, setCustomWidth] = useState(null);
  const textAreaRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    if (inputIsOpen) {
      setIsChangeable(true);
    }
  }, []);

  useEffectUpdate(() => {
    if (!isChangeable && newName !== value && !withButtons) {
      onRename();
    }
    if (inputStatus) {
      inputStatus(isChangeable);
    }
  }, [isChangeable]);

  useEffect(() => {
    setNewName(value);

    if (textAreaRef.current) {
      const textAreaElement = textAreaRef.current.resizableTextArea.textArea;
      textAreaElement.focus();
      if (autoSelect) {
        textAreaElement.setSelectionRange(0, textAreaElement.value.length); // Select all text
      } else {
        textAreaElement.setSelectionRange(
          textAreaElement.value.length,
          textAreaElement.value.length
        );
      }
    }
  }, [isChangeable, value]);

  //sutom width
  useEffect(() => {
    if (spanRef.current && expandInputWidth) {
      const currentWidth = spanRef.current.offsetWidth;
      setCustomWidth(currentWidth + 6);
    }
  }, [value, newName, isChangeable]);

  async function onKeyDown(e) {
    if (e.key === "Enter" && !onPressEnter) {
      e.preventDefault();
      onRename();
    } else if (e.key === "Enter" && onPressEnter) {
      e.preventDefault();
      onPressEnter(newName);
      setNewName(value);
    } else if (e.key === "Escape") {
      setNewName(value);
      setIsChangeable(false);
    }
  }

  function onRename() {
    setIsChangeable(false);
    if (newName === value || newName.trim() === "") {
      return;
    }
    if (onSubmit) {
      onSubmit(newName);
    }
  }
  function onChangeName(value) {
    setNewName(value);
    if (onChange) {
      onChange(value);
    }
  }

  return (
    <section
      className={`name-input ${className ? className : ""}`}
      {...other}
      ref={!withButtons ? sectionRef : null}
    >
      {isChangeable ? (
        <>
          <span className="title-input" ref={spanRef}>
            {newName}
          </span>
          <TextArea
            ref={textAreaRef}
            className="title-input"
            autoSize={{ minRows: minRows, maxRows: maxRows }}
            value={newName}
            onChange={(e) => onChangeName(e.target.value)}
            onKeyDown={onKeyDown}
            style={expandInputWidth ? { width: customWidth + "px" } : {}}
            maxLength={maxLength}
            placeholder={placeholder}
          />
          <section className="name-input-buttons">
            {withButtons && (
              <span className="right-buttons">
                <button className="btn btn-action" onClick={onRename}>
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsChangeable(false)}
                >
                  <CloseOutlined />
                </button>
              </span>
            )}
            {addButtons.length > 0 && (
              <span className="left-buttons">
                {addButtons}
              </span>
            )}
          </section>
        </>
      ) : (
        <p className="title" onClick={() => setIsChangeable(true)}>
          {value}
        </p>
      )}
    </section>
  );
}
