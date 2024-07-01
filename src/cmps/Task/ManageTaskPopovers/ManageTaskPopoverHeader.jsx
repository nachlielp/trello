import { SvgButton } from "../../CustomCpms/SvgButton";

export function ManageTaskPopoverHeader({ title, close }) {
    return (
        <header className="manage-task-popover-header">
            {title}
            <span className="close-button-wrapper">
                <SvgButton src="/img/xIcon.svg" className="close-button" onClick={close} />
            </span>
        </header>
    );
}