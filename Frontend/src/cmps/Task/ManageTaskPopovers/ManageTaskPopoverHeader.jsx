import { SvgButton } from "../../CustomCpms/SvgButton"

export function ManageTaskPopoverHeader({ title, close, back }) {
    return (
        <header className="manage-task-popover-header">
            {back && (
                <span className="back-button-wrapper">
                    <SvgButton
                        src="/img/taskActionBtns/arrowLeftIcon.svg"
                        className="back-button"
                        onClick={back}
                    />
                </span>
            )}
            {title}
            <span className="close-button-wrapper">
                <SvgButton
                    src="/img/xIcon.svg"
                    className="close-button"
                    onClick={close}
                />
            </span>
        </header>
    )
}
