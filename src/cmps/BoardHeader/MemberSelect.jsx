import { Popover } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";

//svg
import checkedIcon from "/img/board-index/headerImgs/checkedIcon.svg";
import { ReactSVG } from "react-svg";
import { DownOutlined } from "@ant-design/icons";

export function MemberSelect() {
  const [openListMenu, setOpenListMenu] = useState(false);
  const members = useSelector((state) => state.boardModule.members).filter(
    (member) => member.id !== "666fe4efda8643029b6710f3"
  );
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
          {members?.map((member) => (
            <label htmlFor={member} key={member.id} className="custom-select">
              <input type="checkbox" id={member} />
              <ReactSVG src={checkedIcon} className="checkbox" wrapper="span" />
              {member.fullName}
            </label>
          ))}
        </>
      }
    >
      <input />
      <DownOutlined className="arow" />
    </Popover>
  );
}
