import dayjs from "dayjs";
import { DeleteAttachmentPopover } from "../ManageTaskPopovers/DeleteAttachmentPopover";
import { EditAttachmentPopover } from "../ManageTaskPopovers/EditAttachmentPopover";
export function TaskDetailsAttachment({ attachment, editTask, task }) {
  const { link, text } = attachment;

  function onDownload(e) {
    e.preventDefault();
    const downloadLink = document.createElement("a");
    downloadLink.href = link;
    downloadLink.download = text || "download";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  function onDelete() {
    editTask({
      ...task,
      attachments: task?.attachments?.filter((att) => att.id !== attachment.id),
    });
  }

  function onEdit(newAttachment) {
    editTask({
      ...task,
      attachments: task?.attachments?.map((att) =>
        att.id === attachment.id ? newAttachment : att
      ),
    });
  }

  const isLink = attachment.type === "link";
  //TODO check if img and supported image type
  const isImg = false;
  return (
    <section className="task-details-attachment">
      <article className="attachment-preview">
        {isImg ? (
          <img src={attachment.url} alt={attachment.name} />
        ) : (
          <lable className="attachment-icon-wrapper">
            {attachment.format ? (
              <lable className="attachment-format">{attachment.format}</lable>
            ) : (
              <label className="trello-icon icon-attachment attachment-icon" />
            )}
          </lable>
        )}
      </article>
      <article className="attachment-content">
        <lable className="attachment-title">
          {attachment.text}
          <label className="trello-icon icon-external-link title-icon" />
        </lable>
        <div className="attachment-actions">
          <label className="attachment-created-at">
            {createdAtFormatter({ createdAt: attachment.createdAt })}
          </label>
          <label className="attachment-content-spacer">•</label>
          <label className="attachment-action">Comment</label>
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
