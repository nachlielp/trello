import { Popover, Calendar, Card, Input } from "antd";
import dayjs from "dayjs";
import { useState, useRef, useEffect } from "react";
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
    const startDateRef = useRef(null);
    const endDateRef = useRef(null);
    const endTimeRef = useRef(null);

    useEffect(() => {
        startDate && (startDateRef.current.value = startDate.format('M/D/YYYY'));
    }, [startDate]);

    useEffect(() => {
        endDate && (endDateRef.current.value = endDate.format('M/D/YYYY'));
        endDate && (endTimeRef.current.value = endDate.format('hA'));
    }, [endDate]);

    function onChange(value) {
        setValue(value);
    }

    function prevMonth() {
        const newValue = value.subtract(1, 'month');
        setValue(newValue);
    };

    function nextMonth() {
        const newValue = value.add(1, 'month');
        setValue(newValue);
    };

    function dateCellRender(current) {
        const isToday = current.isSame(dayjs(), 'day');
        const isSelected = current.isSame(value, 'day');

        return (
            <div className={`calendar-view__day-cell ${isToday && 'today'} ${isSelected && 'selected'}`}>
                <span>{current.date()}</span>
            </div>
        );
    };

    function cellRender(day, info) {
        if (info.type === "date") return dateCellRender(day);
        return info.originNode;
    };

    function onStartDateCheck(e) {
        if (e.target.checked) {
            endDate ? setStartDate(dayjs(endDate).subtract(1, 'day')) : setStartDate(dayjs());
        } else {
            setStartDate(null);
        }
    }

    function onEndDateCheck(e) {
        if (e.target.checked) {
            startDate ? setEndDate(dayjs(startDate).add(1, 'day')) : setEndDate(dayjs());
        } else {
            setEndDate(null);
        }
    }

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
                <div className="input-wrapper">
                    <CheckBox onChange={onStartDateCheck} className="checkbox" />
                    {!startDate &&
                        <span className="empty-date">M/D/YYYY</span>
                    }
                    {startDate &&
                        <Input ref={startDateRef} className="date-input" />
                    }
                </div>
            </article>
            <article className="end-date ">
                <label className="section-label selected">End Date</label>
                <div className="input-wrapper">
                    <CheckBox onChange={onEndDateCheck} defaultChecked={true} className="checkbox" />
                    {!endDate &&
                        <span className="empty-date">M/D/YYYY</span>
                    }
                    {endDate &&
                        <>
                            <Input ref={endDateRef} className="date-input" />
                            <Input ref={endTimeRef} className="time-input" />
                        </>
                    }
                </div>
            </article>
        </Card>
    )
}