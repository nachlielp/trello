import dayjs from "dayjs";
import { DeleteAttachmentPopover } from "../ManageTaskPopovers/DeleteAttachmentPopover";
import { EditAttachmentPopover } from "../ManageTaskPopovers/EditAttachmentPopover";
import { useState } from "react";
import { utilService } from "../../../services/util.service";
import { useSelector } from "react-redux";
import { Image } from "antd";

export function TaskDetailsAttachment({
  attachment,
  editTask,
  task,
  editBoard,
}) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const user = useSelector((state) => state.userModule.user);
  const board = useSelector((state) => state.boardModule.board);
  const { link, text } = attachment;

  const isCover = task?.cover?.attachment?.id === attachment.id;

  function onDownload(e) {
    e.preventDefault();
    e.stopPropagation();

    const downloadLink = document.createElement("a");
    downloadLink.href = link;
    downloadLink.download = text || "download";
    downloadLink.target = "_blank";
    downloadLink.rel = "noopener noreferrer";

    fetch(link)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Download failed:", error);
        window.open(link, "_blank");
      });
  }

  async function onDelete() {
    const newActivity = utilService.createActivity(
      {
        type: "removeAttachment",
        targetId: task.id,
        targetName: task.name,
        attachmentLink: link,
        attachmentName: text,
      },
      user
    );
    await editBoard({
      ...board,
      activities: [...board?.activities, newActivity],
    });
    const newTask = {
      ...task,
      attachments: task?.attachments?.filter((att) => att.id !== attachment.id),
    };
    if (isCover) {
      newTask.cover = {
        ...task.cover,
        attachment: null,
      };
    }
    editTask(newTask);
  }

  function onEdit(newAttachment) {
    editTask({
      ...task,
      attachments: task?.attachments?.map((att) =>
        att.id === attachment.id ? newAttachment : att
      ),
    });
  }

  function onClickAttachment(e) {
    e.stopPropagation();

    if (e.target.classList.contains("attachment-action")) {
      return;
    }

    if (attachment.type === "link") {
      window.open(attachment.link, "_blank");
    } else {
      setPreviewVisible(true);
    }
  }

  function onMakeCover(e) {
    e.stopPropagation();

    const coverSize = task?.cover?.size || "normal";
    if (isCover) {
      editTask({
        ...task,
        cover: {
          ...task.cover,
          attachment: null,
          size: coverSize,
        },
        attachments: task?.attachments?.map((att) =>
          att.id === attachment.id ? { ...att, isCover: false } : att
        ),
      });
    } else {
      editTask({
        ...task,
        cover: {
          ...task.cover,
          attachment: attachment,
          color: null,
          size: coverSize,
        },
        attachments: task?.attachments?.map((att) =>
          att.id === attachment.id ? { ...att, isCover: true } : att
        ),
      });
    }
  }
  const isLink = attachment.type === "link";
  //TODO check if img and supported image type
  const isImg = attachment.type === "image";
  return (
    <section className="task-details-attachment" onClick={onClickAttachment}>
      {previewVisible && (
        <Image
          preview={{
            visible: previewVisible,
            src: attachment.link,
            onVisibleChange: (visible) => setPreviewVisible(visible),
          }}
          src={isImg ? attachment.link : ""}
          alt={attachment.text}
          style={{ display: "none" }}
        />
      )}
      <article
        className="attachment-preview"
        style={{ backgroundColor: attachment.avgBgColor?.color }}
      >
        {isImg ? (
          // <img src={attachment.link} alt={attachment.text} />
          <Image
            width={112}
            height={80}
            src={attachment.link}
            preview={false}
            style={{ objectFit: "contain" }}
          />
        ) : (
          <label className="attachment-icon-wrapper">
            {attachment.format ? (
              <label className="attachment-format">{attachment.format}</label>
            ) : (
              <label className="prello-icon icon-attachment attachment-icon" />
            )}
          </label>
        )}
      </article>
      <article className="attachment-content">
        <label className="attachment-title">
          {attachment.text}
          <label className="prello-icon icon-external-link title-icon" />
        </label>
        <div className="attachment-actions">
          <label className="attachment-created-at">
            {createdAtFormatter({ createdAt: attachment.createdAt })}
          </label>
          {/* <label className="attachment-content-spacer">•</label>
          <label className="attachment-action">Comment</label> */}
          <label className="attachment-content-spacer">•</label>
          {!isLink && (
            <>
              <a
                href={attachment.url}
                className="attachment-action"
                onClick={onDownload}
              >
                Download
              </a>
              <label className="attachment-content-spacer">•</label>
            </>
          )}
          <label className="attachment-action">
            <DeleteAttachmentPopover
              popoverTitle={
                isLink ? "Remove attachment?" : "Delete attachment?"
              }
              onClose={() => {}}
              backToList={() => {}}
              onDelete={onDelete}
              anchorEl={
                <label className="attachment-action">
                  {isLink ? "Remove" : "Delete"}
                </label>
              }
              isDelete={!isLink}
            />
          </label>
          <label className="attachment-content-spacer">•</label>
          <EditAttachmentPopover
            attachment={attachment}
            onEdit={onEdit}
            anchorEl={<label className="attachment-action">Edit</label>}
          />
        </div>
        <div className="make-cover-btn" onClick={onMakeCover}>
          {attachment.type === "image" && (
            <>
              <label className="prello-icon icon-card-cover" />
              <label className="make-cover-btn-label">
                &nbsp;
                {isCover ? "Remove cover" : "Make cover"}
              </label>
            </>
          )}
        </div>
      </article>
    </section>
  );
}

function createdAtFormatter({ createdAt }) {
  const now = dayjs();
  const date = dayjs(createdAt);
  const diffSeconds = now.diff(date, "second");
  const diffMinutes = now.diff(date, "minute");
  const diffHours = now.diff(date, "hour");

  if (diffSeconds < 20) {
    return `Added just now`;
  } else if (diffSeconds < 60) {
    return `Added ${diffSeconds} seconds ago`;
  } else if (diffMinutes < 60) {
    return `Added ${diffMinutes} minutes ago`;
  } else if (diffHours < 24 && now.date() === date.date()) {
    return `Added ${diffHours} hours ago`;
  } else {
    return `Added ${date.format("MMM D, YYYY")}`;
  }
}
