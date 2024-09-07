import { Tooltip } from "antd";
import { ReactSVG } from "react-svg";
import { utilService } from "../../../services/util.service";

export function DescriptionBadge({ desc }) {
  return utilService.isNotEmpty(desc) ? (
    <Tooltip
      placement="bottom"
      title="This card has a description"
      key="description"
      arrow={false}
      overlayInnerStyle={utilService.tooltipOuterStyle()}
    >
      <span className="task-icon-wrapper">
        <ReactSVG
          src="/img/taskBadges/description.svg"
          alt="description"
          className="task-icon"
          wrapper="span"
        />
      </span>
    </Tooltip>
  ) : (
    <></>
  );
}
