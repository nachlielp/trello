import { Tooltip } from "antd";
import descriptionIcon from "../../assets/svgs/description.svg";
import fileIcon from "../../assets/svgs/file.svg";
import { ReactSVG } from "react-svg";
export function TaskPreviewBadges({ task }) {
  const taskIcons = [];
  if (task.badges.description) {
    taskIcons.push(
      <Tooltip
        placement="bottom"
        title="This card has a description"
        key="description"
        arrow={false}
      >
        <span className="task-icon-wrapper">
          <ReactSVG src={descriptionIcon} alt="description" className="task-icon" wrapper="span" />
        </span>
      </Tooltip>
    );
  }
  if (task.badges.attachments > 0) {
    taskIcons.push(
      <Tooltip
        placement="bottom"
        title="Attachments"
        key="attachments"
        arrow={false}
      >
        <span className="task-icon-wrapper">
          <ReactSVG src={fileIcon} alt="file" className="task-icon" wrapper="span" />
          <span className="task-icon-count">{task.badges.attachments}</span>
        </span>
      </Tooltip>
    );
  }

  return < section className="task-preview-icons" > {taskIcons}</section>
}
