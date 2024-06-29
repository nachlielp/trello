import { DownOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";

export function CustomSelect() {
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
            <label htmlFor={member} key={member.id}>
              <input type="checkbox" id={member} />
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
