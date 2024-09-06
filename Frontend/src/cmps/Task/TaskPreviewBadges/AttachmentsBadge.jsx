import { Tooltip } from "antd";
import { ReactSVG } from "react-svg";

export function AttachmentsBadge({ numOfAttachments = 0 }) {
  return numOfAttachments > 0 ? (
    <Tooltip
      placement="bottom"
      title="Attachments"
      key="attachments"
      arrow={false}
    >
      <span className="task-icon-wrapper">
        <ReactSVG
          src="/img/taskBadges/file.svg"
          alt="file"
          className="task-icon"
          wrapper="span"
        />
        <span className="task-icon-count">{numOfAttachments}</span>
      </span>
    </Tooltip>
  ) : (
    <></>
  );
}
