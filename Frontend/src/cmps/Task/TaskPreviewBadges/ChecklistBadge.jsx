import { Tooltip } from "antd";
import { ReactSVG } from "react-svg";
import { utilService } from "../../../services/util.service";
import { useState, useEffect } from "react";

export function ChecklistBadge({ checklists }) {
  const [countState, setCountState] = useState(0);
  const [allCheckedState, setAllCheckedState] = useState(false);

  useEffect(() => {
    if (checklists) {
      const { count, allChecked } = utilService.getChecklistBadge(checklists);
      setCountState(count);
      setAllCheckedState(allChecked);
    }
  }, [JSON.stringify(checklists)]);

  return countState ? (
    <Tooltip
      placement="bottom"
      title="Checklist items"
      key="checklist"
      arrow={false}
      overlayInnerStyle={utilService.tooltipOuterStyle()}
    >
      <span
        className={`task-icon-wrapper checklist ${
          allCheckedState ? "completed" : ""
        }`}
      >
        <ReactSVG
          src={"/img/board-index/detailsImgs/checkListIcon.svg"}
          alt="check"
          className="task-icon checklist-icon"
          wrapper="span"
        />
        <span className="task-icon-count check-list">{countState}</span>
      </span>
    </Tooltip>
  ) : (
    <></>
  );
}
