import { DownOutlined } from "@ant-design/icons"
import { Popover } from "antd"
import { useState, useEffect, useRef } from "react"
import { ReactSVG } from "react-svg"
import Popup from "@atlaskit/popup"

export function CustomSelect({
    options = [],
    onSelect,
    value,
    disabled = false,
    optionsClassName = "",
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState(options[0])
    const [searchValue, setSearchValue] = useState("")
    const [filteredItems, setFilteredItems] = useState(options)
    const divRef = useRef(null)
    const inputRef = useRef(null)
    const triggerRef = useRef(null)

    useEffect(() => {
        onSelect(options.find((o) => o.id === value))
    }, [value])

    //when opens modal input focus
    useEffect(() => {
        if (isOpen && !disabled) {
            inputRef.current.focus()
        }
    }, [isOpen])

    useEffect(() => {
        setFilteredItems(options)
        if (options.length > 0) {
            setSelectedItem(options[0])
        }

        if (value) {
            setSelectedItem(options.find((o) => o.id === value))
        }
    }, [options])

    function onInput(e) {
        setSearchValue(e.target.value)
    }

    function onSelectOption(item, e) {
        e.stopPropagation()
        setSelectedItem(item)
        if (onSelect) {
            onSelect(item)
        }
        setIsOpen(false)
    }

    const content = !disabled && (
        <div
            className={`custom-select-options ${optionsClassName}`}
            style={{ width: `${triggerRef.current?.clientWidth}px` }}
        >
            {filteredItems.map((item) => (
                <button
                    key={item?.id}
                    onClick={(e) => onSelectOption(item, e)}
                    className={`option ${
                        selectedItem?.name === item?.name ? "selected" : ""
                    } ${item.isCurrent ? "current" : ""}`}
                >
                    {item?.element || item?.name}
                </button>
            ))}
        </div>
    )

    const trigger = () => (
        <div
            className="custom-select-item"
            onClick={() => (disabled ? null : setIsOpen(!isOpen))}
            ref={triggerRef}
        >
            <input
                className="custom-input"
                ref={inputRef}
                placeholder={selectedItem?.name}
                value={searchValue}
                onChange={onInput}
                disabled={disabled}
            />

            <ReactSVG
                className="arrow-down"
                src="/img/workspace/backIcon.svg"
                wrapper="span"
            />
        </div>
    )

    return (
        // <Popover
        //   trigger="click"
        //   placement="bottomLeft"
        //   open={isOpen}
        //   onOpenChange={disabled ? null : setIsOpen}
        //   arrow={false}
        //   content={content}
        //   zIndex={15000}
        // >
        //   {anchor}
        // </Popover>

        <Popup
            id="manage-cover-popover-popup"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            placement="bottom-start"
            fallbackPlacements={["top-start", "auto"]}
            content={() => content}
            trigger={(triggerProps) => <div {...triggerProps}>{trigger()}</div>}
            zIndex={10000}
            triggerRef={triggerRef}
        />
    )
}
