import { useEffect, useState } from "react";
import { CheckBox } from "../../CustomCpms/CheckBox";
import { NameInput } from "../../CustomCpms/NameInput";
import checkListIcon from "/img/board-index/detailsImgs/checkListIcon.svg";
import { ReactSVG } from "react-svg";
import { Progress } from "antd";
import TextArea from "antd/es/input/TextArea";
import { utilService } from "../../../services/util.service";
import { EllipsisOutlined } from "@ant-design/icons";
import { MoreActionsItemPopover } from "../ManageTaskPopovers/MoreActionsItemPopover";
import { EmojiPopover } from "../ManageTaskPopovers/EmojiPopover";
import { useSelector } from "react-redux";
export function TaskDetailsCheckList({
  checkList,
  changeCheckList,
  changeItem,
  deleteList,
  deleteItem,
  createAsTask,
  setOpenedInputId,
  openedInputId,
  task,
  editBoard,
}) {
  const [checkedCount, setCheckedCount] = useState({
    checked: 0,
    all: checkList.checkItems.length,
  });
  const [onAdd, setOnAdd] = useState(false);
  const [hideChecked, setHideCHecked] = useState(false);
  const [checkItems, setCheckItems] = useState([]);
  const [isChangingTitle, setIsChangingTitle] = useState(false);
  const board = useSelector((state) => state.boardModule.board);
  const user = useSelector((state) => state.userModule.user);

  useEffect(() => {
    if (hideChecked) {
      setCheckItems(
        checkList.checkItems
          .filter((item) => !item.isChecked)
          .sort((a, b) => a.pos - b.pos)
      );
    } else {
      setCheckItems(checkList.checkItems.sort((a, b) => a.pos - b.pos));
    }
  }, [hideChecked, checkList.checkItems]);

  //proggress bar
  useEffect(() => {
    setCheckedCount(() => {
      return { all: checkList.checkItems.length, checked: 0 };
    });
    if (checkList.checkItems.length > 0) {
      checkList.checkItems.filter((item) =>
        item.isChecked
          ? setCheckedCount((prev) => {
              return { ...prev, checked: prev.checked + 1 };
            })
          : 0
      );
    }
  }, [checkList]);

  useEffect(() => {
    if (openedInputId !== `${checkList.id}${checkList.label}` && onAdd) {
      setOnAdd(false);
    }
  }, [onAdd, openedInputId]);

  async function onChangeCheckListLabel(newName) {
    const newActivity = utilService.createActivity(
      {
        targetId: task.id,
        targetName: task.name,
        checklistName: newName,
        previousName: checkList.label,
      },
      user
    );
    changeCheckList(checkList.id, { label: newName });
    await editBoard({
      ...board,
      activities: [...board?.activities, newActivity],
    });
  }

  async function onChangeItem(item, changes) {
    const newActivity = utilService.createActivity(
      {
        targetId: task.id,
        targetName: task.name,
        itemName: item.label,
      },
      user
    );
    if (changes.isChecked) {
      newActivity.type = "checkedItemInCheckList";
    } else {
      newActivity.type = "incompleteItemInCheckList";
    }

    await editBoard({
      ...board,
      activities: [...board.activities, newActivity],
    });
    changeItem(checkList.id, item.id, changes);
  }

  function onAddNewItem(label) {
    if (label.trim() === "") {
      setOnAdd(false);
      return;
    }
    var maxPos = 2111;

    if (checkList.checkItems.length > 0) {
      maxPos = checkList.checkItems.reduce(
        (max, item) => (item.pos > max ? item.pos : max),
        0
      );
      maxPos;
    }
    const newItem = utilService.createCheckListItem({
      pos: maxPos + 10111,
      label,
    });
    const checkItems = [...checkList.checkItems, newItem];
    changeCheckList(checkList.id, { checkItems });
  }

  function onDeleteList() {
    deleteList(checkList);
  }
  function onDeleteItem(itemId) {
    deleteItem(checkList.id, itemId);
  }
  async function onConvertToTask(itemId, itemName) {
    await createAsTask(itemName);
    deleteItem(checkList.id, itemId);
  }

  return (
    <section className="task-details-checklist">
      <header className="task-details-header">
        <ReactSVG src={checkListIcon} wrapper="span" />
        <NameInput
          value={checkList.label}
          expandInputWidth={false}
          className="checkbox-label"
          minRows={2}
          withButtons={true}
          onSubmit={onChangeCheckListLabel}
          inputStatus={(s) => {
            setIsChangingTitle(s);
            if (s) {
              setOpenedInputId(checkList.id);
            }
          }}
          inputIsOpen={isChangingTitle && openedInputId === checkList.id}
        />
        {!isChangingTitle && (
          <>
            {checkList.checkItems.length > 0 &&
              checkList.checkItems.some((i) => i.isChecked) && (
                <button
                  className="btn hide-btn"
                  onClick={() => setHideCHecked((prev) => !prev)}
                >
                  Hide checked items
                </button>
              )}
            <button className="btn" onClick={onDeleteList}>
              Delete
            </button>
          </>
        )}
      </header>
      <Progress
        percent={
          Number(
            ((checkedCount.checked / checkedCount.all) * 100).toFixed(0)
          ) || 0
        }
        percentPosition={{ align: "start", type: "outer" }}
        className={`progres-bar ${
          ((checkedCount.checked / checkedCount.all) * 100).toFixed(0) >= 100
            ? "completed"
            : ""
        }`}
        format={(percent, successPercent) => (successPercent = `${percent}%`)}
      />
      <ul className="task-details-list">
        <MoreActionsItemPopover />
        {checkItems.length > 0 &&
          checkItems.map((item) => (
            <li className="checkbox-item" key={item.id}>
              <CheckBox
                checked={item.isChecked}
                onChange={() =>
                  onChangeItem(item, { isChecked: !item.isChecked })
                }
              />
              <NameInput
                value={item.label}
                expandInputWidth={false}
                className={`checkbox-label ${item.isChecked ? "checked" : ""}`}
                minRows={2}
                withButtons={true}
                inputStatus={(s) => (s ? setOpenedInputId(item.id) : null)}
                onCloseInput={() => setOpenedInputId(null)}
                inputIsOpen={openedInputId === item.id}
                onSubmit={(label) => onChangeItem(item, { label })}
                emojiButton={true}
                addButtons={[
                  <MoreActionsItemPopover
                    key={item.id}
                    anchorEl={
                      <button className="btn btn-secondary options-btn">
                        <EllipsisOutlined />
                      </button>
                    }
                    onDeleteItem={() => onDeleteItem(item.id)}
                    onConvertToTask={() => onConvertToTask(item.id, item.label)}
                  />,
                ]}
              />
              {item.id !== openedInputId && (
                <MoreActionsItemPopover
                  key={item.id}
                  anchorEl={
                    <button className="btn btn-secondary options-btn hover-options">
                      <EllipsisOutlined />
                    </button>
                  }
                  onDeleteItem={() => onDeleteItem(item.id)}
                  onConvertToTask={() => onConvertToTask(item.id, item.label)}
                />
              )}
            </li>
          ))}
        <section className="add-item">
          {!onAdd ? (
            <button
              className="btn add-btn"
              onClick={() => {
                setOnAdd(true);
                setOpenedInputId(`${checkList.id}${checkList.label}`);
              }}
            >
              Add an item
            </button>
          ) : (
            <NameInput
              inputIsOpen={true}
              className="checkbox-label"
              expandInputWidth={false}
              withButtons={true}
              inputStatus={(e) => setOnAdd(e)}
              minRows={2}
              onPressEnter={(e) => onAddNewItem(e)}
              placeholder="Add an item"
              onSubmit={(e) => onAddNewItem(e)}
              emojiButton={true}
            />
          )}
        </section>
      </ul>
    </section>
  );
}
