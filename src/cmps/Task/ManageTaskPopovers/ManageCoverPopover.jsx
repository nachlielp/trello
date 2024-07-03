import { Popover, Input, Image } from "antd"
import { useState, useEffect } from "react";
import { ManageTaskPopoverHeader } from "../ManageTaskPopovers/ManageTaskPopoverHeader";
import { utilService } from "../../../services/util.service";
import { useSelector } from "react-redux";

export function ManageCoverPopover({ anchorEl, editTask, task }) {
    const boardCoverImgs = useSelector((state) => state.boardModule.board.coverImgs);
    const [isOpen, setIsOpen] = useState(false);

    function onClose() {
        setIsOpen(false);
    }

    function onSelectColor(color) {
        editTask({ ...task, cover: { ...task.cover, color } });
    }

    //BUG: when the size is changed, the popover closes
    function onChangeSize(size) {
        editTask({ ...task, cover: { ...task.cover, size: size } });
    }

    function onRemoveCover() {
        editTask({ ...task, cover: { ...task.cover, color: null, scaled: null } });
    }

    function onSelectPhoto(id) {
        console.log(id);
        const img = boardCoverImgs.find((img) => img.id === id);
        editTask({ ...task, cover: { ...task.cover, scaled: img.scaledImgs, color: null, idUploadedBackground: img.id } });
    }

    const isCover = task.cover.color || task.cover.scaled;

    return (
        <Popover
            className="manage-cover-popover"
            trigger="click"
            placement="bottomRight"
            open={isOpen}
            close={onClose}
            onOpenChange={setIsOpen}
            arrow={false}
            content={
                <section className="manage-cover-content" style={{ '--dynamic-bg-color': utilService.getColorHashByName(task.cover.color)?.bgColor }}>
                    <ManageTaskPopoverHeader title="Cover" close={onClose} />
                    <section className="cover-body">
                        <h3 className="cover-sub-title">Size</h3>
                        <article className={`cover-btns `}>
                            <div className="half-size-btn" onClick={() => onChangeSize("normal")}>
                                <div className={`sub-block-1 ${task.cover.color ? "active" : "non-active"}`} ></div>
                                <div className="sub-block-2">
                                    <div className="row-1"></div>
                                    <div className="row-2"></div>
                                    <div className="row-3">
                                        <div className="col-1"></div>
                                        <div className="col-2"></div>
                                    </div>
                                    <div className="row-4"></div>
                                </div>
                            </div>
                            <div className="full-size-btn" onClick={() => onChangeSize("full")}>
                                <div className="sub-block-1" >
                                    <div className="row-1"></div>
                                    <div className="row-2"></div>
                                </div>
                            </div>
                        </article>
                        {isCover && <button className="remove-cover-btn" onClick={onRemoveCover}>Remove cover</button>}
                        <h3 className="cover-sub-title">Colors</h3>
                        <article className="color-btns">
                            {utilService.getBaseColors().map((color) => (
                                <div className={`color-btn ${task.cover.color === color.color ? "active" : ""}`} style={{ backgroundColor: color.bgColor }} key={color.color} onClick={() => onSelectColor(color.color)}></div>
                            ))}
                        </article>
                        <h3 className="cover-sub-title">Photos from Unsplash</h3>
                        <article className="photo-btns">
                            {boardCoverImgs.map((img) => (
                                <div className="photo-btn" key={img.id} onClick={() => onSelectPhoto(img.id)}>
                                    <Image className="photo-item" src={img.scaledImgs[0].url} alt={img.photographer} preview={false} />
                                </div>
                            ))}
                        </article>
                    </section>
                </section>
            }
        >
            {anchorEl}
        </Popover>
    );
}