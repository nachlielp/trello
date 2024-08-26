import { DownOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { useState, useEffect, useRef } from "react";
import { ReactSVG } from "react-svg";

export function CustomSelect({
  options = [],
  onSelect,
  value,
  disabled = false,
  optionsClassName = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(options[0]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState(options);
  const divRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    onSelect(options.find((o) => o.id === value));
  }, [value]);

  //when opens modal input focus
  useEffect(() => {
    if (isOpen && !disabled) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setFilteredItems(options);
    if (options.length > 0) {
      setSelectedItem(options[0]);
    }

    if (value) {
      setSelectedItem(options.find((o) => o.id === value));
    }
  }, [options]);

  function onInput(e) {
    setSearchValue(e.target.value);
  }

  function onSelectOption(item) {
    setSelectedItem(item);
    if (onSelect) {
      onSelect(item);
    }
    setIsOpen(false);
  }

  const content = !disabled && (
    <div
      className={`custom-select-options ${optionsClassName}`}
      style={{ width: `${divRef.current?.clientWidth}px` }}
    >
      {filteredItems.map((item) => (
        <button
          key={item?.id}
          onClick={() => onSelectOption(item)}
          className={`option ${
            selectedItem?.name === item?.name ? "selected" : ""
          } ${item.isCurrent ? "current" : ""}`}
        >
          {item?.element || item?.name}
        </button>
      ))}
    </div>
  );
  return (
    <Popover
      trigger="click"
      placement="bottomLeft"
      open={isOpen}
      onOpenChange={disabled ? null : setIsOpen}
      arrow={false}
      content={content}
    >
      <div
        className="custom-select-item"
        onClick={() => (disabled ? null : setIsOpen(!isOpen))}
        ref={divRef}
      >
        {
          <input
            className="custom-input"
            ref={inputRef}
            placeholder={selectedItem?.name}
            value={searchValue}
            onChange={onInput}
            disabled={disabled}
          />
        }
        {/* <DownOutlined className="arrow-down" /> */}
        <ReactSVG
          className="arrow-down"
          src="/img/workspace/backIcon.svg"
          wrapper="span"
        />
      </div>
    </Popover>
  );
}
