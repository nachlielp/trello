import { ReactSVG } from "react-svg"
import checkedIcon from "/img/board-index/headerImgs/checkedIcon.svg"

export function CheckBox({ className, onChange, ...other }) {
    return (
        <label className={`custom-checkbox ${className ? className : ""}`}>
            <input
                className="input-checkbox"
                type="checkBox"
                onChange={onChange}
                {...other}
            />
            <ReactSVG src={checkedIcon} wrapper="span" className="checkbox" />
        </label>
    )
}
