import { useEffect, useState } from "react";
import { CheckBox } from "../../CustomCpms/CheckBox";
import { NameInput } from "../../CustomCpms/NameInput";
import taskCheckList from "/img/taskBadges/taskCheckList.svg";
import { ReactSVG } from "react-svg";
import { Progress } from "antd";
import TextArea from "antd/es/input/TextArea";
import { utilService } from "../../../services/util.service";
export function TaskDetailsCheckList({
  checkList,
  changeCheckList,
  changeItem,
  deleteList,
}) {
  const [checkedCount, setCheckedCount] = useState({
    checked: 0,
    all: checkList.checkItems.length,
  });
  const [onAdd, setOnAdd] = useState(false);
  const [hideChecked, setHideCHecked] = useState(false);
  const [checkItems, setCheckItems] = useState([]);
  const [isChangingTitle, setIsChangingTitle] = useState(false);

  useEffect(() => {
    if (hideChecked) {
      setCheckItems(checkList.checkItems.filter((item) => !item.isChecked));
    } else {
      setCheckItems(checkList.checkItems);
    }
  }, [hideChecked, checkList.checkItems]);

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
  function onChangeCheckListLabel(newName) {
    changeCheckList(checkList.id, { label: newName });
  }
  function onChangeItem(itemId, changes) {
    changeItem(checkList.id, itemId, changes);
  }
  function onAddNewItem(label) {
    var maxPos = 2111;

    if (checkList.checkItems.length > 0) {
      maxPos = checkList.checkItems
        .filter((item) => item.pos > 0)
        .reduce((max, item) => (item.pos > max ? item.pos : max), 0);
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
    deleteList(checkList.id);
  }

  return (
    <section className="task-details-checklist">
      <header className="task-details-header">
        <ReactSVG src={taskCheckList} wrapper="span" />
        <NameInput
          value={checkList.label}
          expandInputWidth={false}
          className="checkbox-label"
          minRows={2}
          // withButtons={true}
          addButtons={[<button className="btn">lol</button>]}
          onSubmit={onChangeCheckListLabel}
          inputStatus={setIsChangingTitle}
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
        percent={((checkedCount.checked / checkedCount.all) * 100).toFixed(0)}
        percentPosition={{ align: "start", type: "outer" }}
        className={`progres-bar ${
          ((checkedCount.checked / checkedCount.all) * 100).toFixed(0) >= 100
            ? "completed"
            : ""
        }`}
        format={(percent, successPercent) => (successPercent = `${percent}%`)}
      />
      <ul className="task-details-list">
        {checkItems.length > 0 &&
          checkItems.map((item) => (
            <li className="checkbox-item" key={item.id}>
              <CheckBox
                checked={item.isChecked}
                onChange={() =>
                  onChangeItem(item.id, { isChecked: !item.isChecked })
                }
              />
              <NameInput
                value={item.label}
                expandInputWidth={false}
                className={`checkbox-label ${item.isChecked ? "checked" : ""}`}
                minRows={2}
                withButtons={true}
                // onSubmit={(label) => onChangeItem(item.id, { label })}
                addButtons={[
                  <button className="btn btn-secondary">LOl</button>,
                  <button className="btn btn-secondary">kek</button>,
                  <button className="btn btn-secondary">cheburek</button>,
                ]}
                />
            </li>
          ))}
        <section className="add-item">
          {!onAdd ? (
            <button className="btn add-btn" onClick={() => setOnAdd(true)}>
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
            onPressEnter={(e)=>onAddNewItem(e)}
            placeholder="Add an item"
            onSubmit={(e) => onAddNewItem(e)}
            />
          )}
        </section>
      </ul>
    </section>
  );
}
