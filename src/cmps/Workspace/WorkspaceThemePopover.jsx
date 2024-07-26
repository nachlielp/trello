import { Popover } from "antd";
import { useEffect, useState } from "react";
import themeLight from "/img/workspace/theme-light.svg";
import themeDark from "/img/workspace/theme-dark.svg";
import themeDefault from "/img/workspace/theme-default.svg";

export function WorkspaceThemePopover({ anchorEl, setDarkMode, darkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("default");

  function onClose() {
    setIsOpen(false);
  }
  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };
  useEffect(() => {
    if (selectedOption) {
      if (selectedOption === "light") {
        setDarkMode(false);
      } else if (selectedOption === "dark") {
        setDarkMode(true);
      } else if (selectedOption === "default") {
        setDarkMode(null);
      }
    }
  }, [selectedOption]);

  const btns = [
    <label className={`theme-switch ${darkMode === false ? "checked" : ""}`}>
      <input
        className="theme-radio"
        type="radio"
        value="light"
        onChange={handleRadioChange}
        checked={darkMode === false}
      />
      <span className="theme">
        <img src={themeLight} />
        <span>Light</span>
      </span>
    </label>,
    <label className={`theme-switch ${darkMode ? "checked" : ""}`}>
      <input
        className="theme-radio"
        type="radio"
        value="dark"
        onChange={handleRadioChange}
        checked={darkMode}
      />
      <span className="theme">
        <img src={themeDark} />
        <span>Dark</span>
      </span>
    </label>,
    <label className={`theme-switch ${darkMode === null ? "checked" : ""}`}>
      <input
        className="theme-radio"
        type="radio"
        value="default"
        onChange={handleRadioChange}
        checked={darkMode === null}
      />
      <span className="theme">
        <img src={themeDefault} />
        <span>Match browser</span>
      </span>
    </label>,
  ];

  return (
    <Popover
      className={`${isOpen ? "active" : ""}`}
      trigger="click"
      placement="leftTop"
      open={isOpen}
      close={onClose}
      onOpenChange={setIsOpen}
      arrow={false}
      content={
        <section className="manage-theme-popover">
          {btns.map((b, idx) => (
            <button className="option" key={idx}>
              {b}
            </button>
          ))}
        </section>
      }
    >
      {anchorEl}
    </Popover>
  );
}
