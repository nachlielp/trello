import { Popover, Calendar, Card } from "antd";
import dayjs from "dayjs";
import { useState, useRef } from "react";
// import 'dayjs/locale/en';
import { SvgButton } from "../../CustomCpms/SvgButton";
import { CheckBox } from "../../CustomCpms/CheckBox";

const customLocale = {
    lang: {
        locale: 'en',
        shortWeekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
};



export function ManageDatesPopover({ anchorEl }) {
    return (
        <Popover
            open={true}
            onClose={() => { }}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            content={<ManageDatesPopoverContent />}
        >
            {anchorEl}
        </Popover>
    )
}

function ManageDatesPopoverContent() {
    const [value, setValue] = useState(dayjs());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(dayjs());

    const onChange = (value) => {
        console.log("value", value);
        setValue(value);
    }

    const prevMonth = () => {
        const newValue = value.subtract(1, 'month');
        setValue(newValue);
    };

    const nextMonth = () => {
        const newValue = value.add(1, 'month');
        setValue(newValue);
    };

    const dateCellRender = (current) => {
        const isToday = current.isSame(dayjs(), 'day');
        const isSelected = current.isSame(value, 'day');

        return (
            <div className={`calendar-view__day-cell ${isToday && 'today'} ${isSelected && 'selected'}`}>
                <span>{current.date()}</span>
            </div>
        );
    };

    const cellRender = (day, info) => {
        if (info.type === "date") return dateCellRender(day);
        return info.originNode;
    };
    return (
        <Card className="manage-dates-popover-content">
            <header className="calendar-controller">
                <SvgButton src="/img/taskActionBtns/arrowLeftIcon.svg" className="btn back-btn" onClick={prevMonth} />
                <label className="label">{value.format('MMMM YYYY')}</label>
                <SvgButton src="/img/taskActionBtns/arrowLeftIcon.svg" className="btn next-btn" onClick={nextMonth} />
            </header>
            <Calendar
                mode="month"
                value={value}
                fullscreen={false}
                onChange={onChange}
                fullCellRender={cellRender}
                headerRender={() => <div></div>}
                locale={customLocale}
            />
            <article className="start-date">
                <label className="section-label">Start Date</label>
                <CheckBox />
                {!startDate &&
                    <span className="empty-date">M/D/YYYY</span>
                }
                {startDate &&
                    <span className="date">{startDate.format('M/D/YYYY')}</span>
                }
            </article>
            <article className="end-date ">
                <label className="section-label selected">End Date</label>
                <CheckBox />
            </article>
        </Card>
    )
}