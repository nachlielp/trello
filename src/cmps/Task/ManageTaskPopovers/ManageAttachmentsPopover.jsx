import { Popover, Input } from "antd";
import { ManageTaskPopoverHeader } from "./ManageTaskPopoverHeader";
import { useState, useRef, useEffect } from "react";
import { Tooltip } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import CloudinaryUpload from "../../CloudinaryUpload";
import { utilService } from "../../../services/util.service";
export function ManageAttachmentsPopover({
  anchorEl,
  task,
  editTask,
  editBoard,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function onClose() {
    setIsOpen(false);
  }

  return (
    <Popover
      open={isOpen}
      onClose={onClose}
      onOpenChange={setIsOpen}
      trigger="click"
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      content={
        <ManageAttachmentsPopoverContent
          task={task}
          editTask={editTask}
          onClose={onClose}
        />
      }
      placement="right"
    >
      {anchorEl}
    </Popover>
  );
}

function ManageAttachmentsPopoverContent({ task, editTask, onClose }) {
  const [link, setLink] = useState("");
  const [text, setText] = useState("");
  const [invalidLink, setInvalidLink] = useState(false);
  const [focusedLink, setFocusedLink] = useState(false);
  const [focusedText, setFocusedText] = useState(false);
  const [attachmentUrl, setAttachmentUrl] = useState(null);

  const linkRef = useRef(null);
  const textRef = useRef(null);

  function onAddLink() {
    if (link === "" || !utilService.isValidUrl(link)) {
      setInvalidLink(true);
      return;
    }
    editTask({
      ...task,
      attachments: [...task.attachments, { link, text }],
    });
    onClose();
  }
  function onClearLink() {
    setLink("");
    linkRef.current.focus();
  }

  function onClearText() {
    setText("");
    textRef.current.focus();
  }

  function onAttachUrl(url) {
    console.log("onAttachUrl: ", url);
    setAttachmentUrl(url);
  }
  return (
    <section className="manage-attachments-popover-content">
      <ManageTaskPopoverHeader
        title="Attachments"
        close={onClose}
        // onSave={onSave}
      />
      <main className="main">
        <label className="section-title">
          Attach a file from your computer
        </label>
        <label className="section-subtitle">
          You can also drag and drop files to upload them.
        </label>
        <CloudinaryUpload
          onAttachUrl={onAttachUrl}
          anchorEl={<button className="btn upload-button">Upload</button>}
        />

        <hr className="divider" />
        <label className="section-title">Search or paste a link</label>
        <div className="input-wrapper">
          <Input
            type="text"
            className={`input ${invalidLink && "invalid"} ${
              focusedLink && "focused"
            }`}
            placeholder="Find recent links or past a new link"
            suffix={
              <ClearLinkIcon onClick={onClearLink} display={link !== ""} />
            }
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
              setInvalidLink(false);
            }}
            onFocus={() => setFocusedLink(true)}
            onBlur={() => setFocusedLink(false)}
            ref={linkRef}
          />
          {invalidLink && (
            <label className="invalid-link-message">
              <ErrorIcon />
              Enter a valid URL.
            </label>
          )}
        </div>
        <label className="section-title">Display text (optional)</label>
        <div className="input-wrapper">
          <Input
            type="text"
            className={`input ${focusedText && "focused"}`}
            placeholder="Text to display"
            suffix={
              <ClearLinkIcon onClick={onClearText} display={text !== ""} />
            }
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setFocusedText(true)}
            onBlur={() => setFocusedText(false)}
            ref={textRef}
          />
        </div>
        {/* <label className="section-title">Recently viewed</label> */}
        {/* TODO: Add recently viewed */}
        {/* <article className="recently-viewed"></article> */}
        <footer className="footer">
          <button className="btn cancel">Cancel</button>
          <button className="btn insert" onClick={onAddLink}>
            Insert
          </button>
        </footer>
      </main>
    </section>
  );
}

const ClearLinkIcon = ({ display, onClick }) => {
  return (
    <Tooltip title="Clear link" arrow={false} placement="bottom">
      <div
        className="close-icon-wrapper"
        style={{
          background: "44546f",
          padding: "4px",
          display: display ? "flex" : "none",
        }}
        onClick={onClick}
      >
        <label className="trello-icon icon-close"></label>
      </div>
    </Tooltip>
  );
};

const ErrorIcon = () => {
  return (
    <label className="error-icon-wrapper">
      <label className="attachment-error-icon">
        <label className="attachment-error-icon-text">!</label>
      </label>
    </label>
  );
};
