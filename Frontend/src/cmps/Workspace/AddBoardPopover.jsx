import { Popover, Input } from "antd"
import { useState, useRef } from "react"
import { ManageTaskPopoverHeader } from "../Task/ManageTaskPopovers/ManageTaskPopoverHeader"
import { utilService } from "../../services/util.service"
import { CustomSelect } from "../CustomCpms/CustomSelect"
import privateIcon from "/img/board-index/headerImgs/privateIcon.svg"
import publicIcon from "/img/board-index/headerImgs/publicIcon.svg"
import peopleIcon from "/img/board-index/headerImgs/peopleIcon.svg"
import { ReactSVG } from "react-svg"
import Popup from "@atlaskit/popup"

const options = [
    {
        id: "private",
        name: "Private",
        element: (
            <article className="visibilty-select-option-element">
                <ReactSVG src={privateIcon} wrapper="span" />
                <div className="element-content">
                    <h3 className="element-title">Private</h3>
                    <p className="element-txt">
                        Only board members can see this board. Workspace admins
                        can close the board or remove members.
                    </p>
                </div>
            </article>
        ),
    },
    {
        id: "workspace",
        name: "Workspace",
        element: (
            <article className="visibilty-select-option-element">
                <ReactSVG src={peopleIcon} wrapper="span" />
                <div className="element-content">
                    <h3 className="element-title">Workspace</h3>
                    <p className="element-txt">
                        All members of the Prello Workspace Workspace can see
                        and edit this board.
                    </p>
                </div>
            </article>
        ),
    },
    {
        id: "public",
        name: "Public",
        element: (
            <article className="visibilty-select-option-element">
                <ReactSVG src={publicIcon} wrapper="span" />
                <div className="element-content">
                    <h3 className="element-title">Public</h3>
                    <p className="element-txt">
                        Anyone on the internet can see this board. Only board
                        members can edit.
                    </p>
                </div>
            </article>
        ),
    },
]

export function AddBoardPopover({ onAddBoard, anchorEl, placement = "right" }) {
    const [isOpen, setIsOpen] = useState(false)
    const [boardName, setBoardName] = useState("")
    const [focused, setFocused] = useState(false)
    const [selectedBg, setSelectedBg] = useState(utilService.getBgImgs()[0])
    const [selectedBgUrl, setSelectedBgUrl] = useState(
        utilService.getBgImgs()[0].backgroundImageScaled[2]?.url
    )

    const popoverRef = useRef(null) // Add a ref for the Popover

    function onOpenChange(e) {
        setBoardName("")
        setIsOpen(e)
    }

    function handleFocus() {
        setFocused(true)
    }

    function onBgSelect(background) {
        const bgImg = utilService
            .getBgImgs()
            .find((bg) => bg.background === background)
        const bgColor = utilService
            .getBgGradientColors()
            .find((bg) => bg.background === background)
        setSelectedBg(bgImg || bgColor)
        if (bgImg) {
            setSelectedBgUrl(bgImg.backgroundImageScaled[2]?.url)
        } else if (bgColor) {
            setSelectedBgUrl(bgColor.backgroundImage)
        }
    }

    async function onCreateBoard() {
        if (boardName === "") {
            return
        }
        const newBoard = await utilService.createNewBoard({
            name: boardName,
            backgroundData: selectedBg,
        })
        onAddBoard(newBoard)
        setBoardName("")
        onOpenChange(false)
    }

    //TODO: add visibility options

    const content = (
        <section className="add-board-popover-content">
            <ManageTaskPopoverHeader
                title="Create board"
                close={() => onOpenChange(false)}
            />
            <hr className="header-hr" />

            <article className="selected-bg-wrapper">
                <article
                    className="selected-bg"
                    style={{
                        backgroundImage: selectedBgUrl
                            ? `url(${selectedBgUrl})`
                            : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <ReactSVG
                        src="/img/workspace/board-bg-skeleton.svg"
                        wrapper="span"
                    />
                </article>
            </article>
            <p className="title">Background</p>
            <article className="bg-img-options">
                {utilService.getBgImgs().map((bg) => (
                    <div
                        key={bg.background}
                        className="bg-img-option"
                        style={{
                            backgroundImage: `url(${bg.backgroundImageScaled[0].url})`,
                        }}
                        onClick={() => onBgSelect(bg.background)}
                    ></div>
                ))}
            </article>
            <article className="bg-color-options">
                {utilService.getBgGradientColors().map((bg) => (
                    <div
                        key={bg.background}
                        className="bg-color-option"
                        style={{
                            backgroundImage: `url(${bg.backgroundImage})`,
                        }}
                        onClick={() => onBgSelect(bg.background)}
                    ></div>
                ))}
            </article>

            <p className="title">Board title*</p>
            <Input
                className="board-name-input"
                onFocus={handleFocus}
                onChange={(e) => setBoardName(e.target.value)}
                value={boardName}
            />
            {focused && boardName === "" && (
                <p className="add-board-popover-desc">
                    <span>👋</span>
                    <span> Board title is required</span>
                </p>
            )}
            <p className="title">Visibility</p>
            <CustomSelect
                className="board-visibility-select"
                options={options}
                value="workspace"
                onSelect={() => {}}
            />
            <button
                className={`add-board-btn ${
                    boardName === "" ? "disabled" : ""
                }`}
                onClick={onCreateBoard}
            >
                Create
            </button>
            <article className="add-board-popover-desc">
                By using images from Unsplash, you agree to their{" "}
                <a href="https://unsplash.com/license" target="_blank">
                    license
                </a>{" "}
                and{" "}
                <a href="https://unsplash.com/terms" target="_blank">
                    Terms of Service
                </a>
            </article>
        </section>
    )
    const onTriggerClick = () => {
        setIsOpen((prev) => !prev)
    }

    const trigger = (triggerProps) => {
        return (
            <label
                {...triggerProps}
                appearance="primary"
                // isSelected={isOpen}
                onClick={onTriggerClick}
            >
                {anchorEl}
            </label>
        )
    }

    return (
        <Popup
            id="add-board-popover-popup"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            placement={placement}
            content={() => content}
            trigger={trigger}
            zIndex={10000}
        />
    )
}
