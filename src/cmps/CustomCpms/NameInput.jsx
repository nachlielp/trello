import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../../customHooks/useClickOutside";
import { useEffectUpdate } from "../../customHooks/useEffectUpdate";

export function NameInput({
  value = "",
  onSubmit,
  expandInputWidth = true,
  maxRows = 1,
  className,
  autoSelect = true,
  ...other
}) {
  const [sectionRef, isChangeable, setIsChangeable] = useClickOutside(false);

  const [newName, setNewName] = useState(value);
  const [customWith, setCustomWith] = useState(null);
  const textAreaRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffectUpdate(() => {
    if (!isChangeable && newName !== value) {
      onRename();
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

  useEffect(() => {
    setCustomWith(null);
    if (paragraphRef.current) {
      const currentWidth = paragraphRef.current.clientWidth;
      setCustomWith({ width: `${currentWidth + 0.4}px` });
    } else {
      setCustomWith({ width: `${(newName.length * 11.1) + 20.54}px` });
    }
  }, [value, newName]);

  async function onKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      onRename();
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

  return (
    <section
      className={`name-input ${className ? className : ""}`}
      {...other}
      ref={sectionRef}
    >
      {isChangeable ? (
        <TextArea
          ref={textAreaRef}
          className="title-input"
          autoSize={{ minRows: 1, maxRows: maxRows }}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={onKeyDown}
          style={expandInputWidth ? customWith : {}}
          maxLength={30}
        />
      ) : (
        <p
          className="title"
          onClick={() => setIsChangeable(true)}
          ref={paragraphRef}
          style={expandInputWidth ? customWith : {}}
        >
          {value}
        </p>
      )}
    </section>
  );
}
