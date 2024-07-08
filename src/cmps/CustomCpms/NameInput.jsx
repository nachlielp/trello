import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../../customHooks/useClickOutside";

export function NameInput({
  value = "",
  onSubmit,
  expandInputWidth = true,
  ...other
}) {
  const [sectionRef, isChangeable, setIsChangeable] = useClickOutside(false);

  const [newName, setNewName] = useState(value);
  const [customWith, setCustomWith] = useState(null);
  const textAreaRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    setNewName(value);
    if (!isChangeable) {
      onRename();
    }
    if (textAreaRef.current) {
      const textAreaElement = textAreaRef.current.resizableTextArea.textArea;
      textAreaElement.focus();
      textAreaElement.setSelectionRange(0, textAreaElement.value.length); // Select all text
    }
  }, [isChangeable, value]);

  useEffect(() => {
    if (paragraphRef.current) {
      const currentWidth = paragraphRef.current.clientWidth;
      setCustomWith({ width: `${currentWidth}px` });
    } else {
      setCustomWith({ width: `${20 + (newName.length * 12 + 1)}px` });
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
    <section {...other} ref={sectionRef}>
      {isChangeable ? (
        <TextArea
          ref={textAreaRef}
          className="title-input"
          autoSize={{ minRows: 1, maxRows: 1 }}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={onKeyDown}
          style={expandInputWidth ? customWith : {}}
        />
      ) : (
        <p
          className="title"
          onClick={() => setIsChangeable(true)}
          ref={paragraphRef}
        >
          {value}
        </p>
      )}
    </section>
  );
}
