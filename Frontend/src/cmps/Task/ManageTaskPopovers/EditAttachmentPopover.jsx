import React, { useState, useRef, useEffect } from "react"
import { Input } from "antd"
import { ManageTaskPopoverHeader } from "./ManageTaskPopoverHeader"
import { utilService } from "../../../services/util.service"
import { useSelector } from "react-redux"
import Popup from "@atlaskit/popup"

export function EditAttachmentPopover({ anchorEl, onEdit, attachment }) {
    const [isOpen, setIsOpen] = useState(false)
    const [link, setLink] = useState(attachment.link)
    const [focusedLink, setFocusedLink] = useState(false)
    const [text, setText] = useState(attachment.text || "")
    const [focusedText, setFocusedText] = useState(false)

    const user = useSelector((state) => state.userModule.user)
    const board = useSelector((state) => state.boardModule.board)

    const textRef = useRef(null)
    const linkRef = useRef(null)

    const isLink = attachment.type === "link"

    useEffect(() => {
        if (isOpen && textRef.current) {
            setTimeout(() => {
                textRef.current?.focus()
                textRef.current?.select()
            }, 0)
        }
    }, [isOpen])

    function onOpenChange(newOpen) {
        setIsOpen(newOpen)
    }

    function onUpdate() {
        if (isLink) {
            if (!utilService.isValidUrl(link)) {
                return
            }
            const newAttachment = {
                ...attachment,
                link,
                text,
            }
            onEdit(newAttachment)
            setIsOpen(false)
        } else {
            if (text === "") {
                return
            }
            const newAttachment = {
                ...attachment,
                text,
            }
            onEdit(newAttachment)
            setIsOpen(false)
        }
    }

    const content = (
        <div
            className="edit-attachment-popover"
            onClick={(e) => e.stopPropagation()}
        >
            <ManageTaskPopoverHeader
                title="Edit attachment"
                close={() => setIsOpen(false)}
            />
            <section className="edit-attachment-page">
                {isLink && (
                    <>
                        <label className="section-title">Link</label>
                        <div className="input-wrapper">
                            <Input
                                type="text"
                                className={`input  ${focusedLink && "focused"}`}
                                value={link}
                                onChange={(e) => {
                                    setLink(e.target.value || "")
                                }}
                                onFocus={() => setFocusedLink(true)}
                                onBlur={() => setFocusedLink(false)}
                                ref={linkRef}
                            />
                        </div>
                    </>
                )}
                <label className="section-title">
                    {isLink ? "Link name (optional)" : "Link name"}
                </label>
                <div className="input-wrapper">
                    <Input
                        type="text"
                        className={`input ${focusedText && "focused"}`}
                        value={text}
                        onChange={(e) => setText(e.target.value || "")}
                        onFocus={() => setFocusedText(true)}
                        onBlur={() => setFocusedText(false)}
                        ref={textRef}
                    />
                </div>
                <button className="btn update" onClick={onUpdate}>
                    Update
                </button>
            </section>
        </div>
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
            id="edit-attachment-popover-popup"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            placement="bottom-start"
            fallbackPlacements={["top-start", "auto"]}
            content={() => content}
            trigger={trigger}
            zIndex={10000}
        />
    )
}
