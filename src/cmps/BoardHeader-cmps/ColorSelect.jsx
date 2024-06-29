import { Popover } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { utilService } from "../../services/util.service";
import { DownOutlined } from "@ant-design/icons";

export function ColorSelect() {
  const [openListMenu, setOpenListMenu] = useState(false);
  const boardLabels = useSelector(
    (state) => state.boardModule.board.labelNames
  );
  const filteredLabels =
    boardLabels &&
    Object.keys(boardLabels)
      .filter((key) => !key.includes("_"))
      .map((key) => ({ name: key, value: boardLabels[key] }));

  return (
    <Popover
      className="list-actions-menu-popover"
      trigger="click"
      placement="bottomLeft"
      open={openListMenu}
      onOpenChange={setOpenListMenu}
      arrow={false}
      content={
        <>
          {filteredLabels &&
            filteredLabels.map((label) => (
              <li key={label.name}>
                <label>
                  <input type="checkbox" />
                  <span
                    title={label.value}
                    style={{
                      backgroundColor: utilService.getColorHashByName(
                        label.name
                      ),
                    }}
                    className="color-peaker"
                  >
                    {label.value}
                  </span>
                </label>
              </li>
            ))}
        </>
      }
    >
      <input />
      <DownOutlined className="arow" />
    </Popover>
  );
}
