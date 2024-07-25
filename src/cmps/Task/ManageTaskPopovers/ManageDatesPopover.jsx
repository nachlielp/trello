import { Popover, Calendar, Card, Input, Checkbox } from "antd";
import dayjs from "dayjs";
import { useState, useRef, useEffect } from "react";
import { SvgButton } from "../../CustomCpms/SvgButton";

const customLocale = {
    lang: {
        locale: 'en',
        shortWeekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
};



export function ManageDatesPopover({ anchorEl, task }) {
    return (
        <Popover
            open={true}
            onClose={() => { }}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            content={<ManageDatesPopoverContent task={task} />}
        >
            {anchorEl}
        </Popover>
    )
}

function ManageDatesPopoverContent({ task }) {
    const defaultEndDate = dayjs().add(1, 'day');
    const [value, setValue] = useState(defaultEndDate);

    const [startDate, setStartDate] = useState(null);
    const [startDateInputValue, setStartDateInputValue] = useState('');
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [lastSelectedStartDate, setLastSelectedStartDate] = useState(null);

    const [endDate, setEndDate] = useState(defaultEndDate);
    const [endDateInputValue, setEndDateInputValue] = useState('');
    const [endTimeInputValue, setEndTimeInputValue] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState(defaultEndDate);
    const [lastSelectedEndDate, setLastSelectedEndDate] = useState(defaultEndDate);

    const [focusedInput, setFocusedInput] = useState("end");//end endTime or start or "none"

    const startDateRef = useRef(null);
    const endDateRef = useRef(null);
    const endTimeRef = useRef(null);

    useEffect(() => {
        if (!dayjs(selectedStartDate).isSame(startDate)) {
            setStartDate(selectedStartDate);
            if (selectedEndDate && dayjs(selectedEndDate).isBefore(selectedStartDate)) {
                setSelectedEndDate(dayjs(selectedStartDate).add(1, 'day'));
            }
        }
        if (selectedStartDate && !dayjs(selectedStartDate).isSame(lastSelectedStartDate)) {
            setLastSelectedStartDate(selectedStartDate);
        }
    }, [selectedStartDate]);

    useEffect(() => {
        if (!dayjs(selectedEndDate).isSame(endDate)) {
            setEndDate(selectedEndDate);
            if (selectedStartDate && dayjs(selectedEndDate).isBefore(selectedStartDate)) {
                setSelectedStartDate(dayjs(selectedEndDate).subtract(1, 'day'));
            }
        }
        if (selectedEndDate && !dayjs(selectedEndDate).isSame(lastSelectedEndDate)) {
            setLastSelectedEndDate(selectedEndDate);
        }
    }, [selectedEndDate]);

    useEffect(() => {
        if (startDate) {
            setStartDateInputValue(startDate.format('M/D/YYYY'));
        } else {
            setStartDateInputValue('');
            setFocusedInput("none");
        }
    }, [startDate]);

    useEffect(() => {
        console.log("endDate", endDate);
        if (endDate) {
            setEndDateInputValue(formatDate(endDate));
            setEndTimeInputValue(formatTime(endDate));
            if (!dayjs(endDate).isSame(value)) {
                setValue(endDate);
            }
        } else {
            setEndDateInputValue('');
            setEndTimeInputValue('');
            setFocusedInput("none");
        }
    }, [endDate]);


    function onSelect(value) {
        if (focusedInput === "start") {
            setSelectedStartDate(value);
        } else {

            setSelectedEndDate(value);
        }
        setFocusedInput("end");
        endDateRef.current.focus();
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
        const isSelected = current.isSame(selectedStartDate, 'day') || current.isSame(selectedEndDate, 'day');
        const isInRange = selectedStartDate && selectedEndDate && current.isAfter(selectedStartDate, 'day') && current.isBefore(selectedEndDate, 'day');

        return (
            <div className={`calendar-view__day-cell ${isToday && 'today'} ${isSelected && 'selected'} ${isInRange && 'in-range'}`}>
                <label className="date-label">
                    {current.date()}
                    <span className='today-indicator'></span>
                </label>
            </div>
        );
    };

    function cellRender(day, info) {
        if (info.type === "date") return dateCellRender(day);
        return info.originNode;
    };

    function onStartDateCheck(e) {
        e.preventDefault();
        if (e.target.checked) {
            setFocusedInput("start");
            if (lastSelectedStartDate && dayjs(lastSelectedStartDate).isBefore(selectedEndDate)) {
                setSelectedStartDate(lastSelectedStartDate);
            } else {
                if (endDate) {
                    setSelectedStartDate(dayjs(endDate).subtract(1, 'day'));
                    setStartDate(dayjs(endDate).subtract(1, 'day'));
                } else {
                    setSelectedStartDate(dayjs());
                    setStartDate(dayjs());
                }
            }
        } else {
            setFocusedInput("none");
            setStartDate(null);
            setSelectedStartDate(null);
        }
    }

    function onEndDateCheck(e) {
        e.preventDefault();
        if (e.target.checked) {
            setFocusedInput("end");
            if (lastSelectedEndDate && (dayjs(lastSelectedEndDate).isAfter(selectedStartDate) || !selectedStartDate)) {
                setSelectedEndDate(lastSelectedEndDate);
                setEndDate(lastSelectedEndDate);
            } else {
                setSelectedEndDate(startDate ? dayjs(startDate).add(1, 'day') : dayjs());
                setEndDate(startDate ? dayjs(startDate).add(1, 'day') : dayjs());
            }
        } else {
            setFocusedInput("none");
            setEndDate(null);
            setSelectedEndDate(null);
        }
    }

    function onStartDateBlur() {
        if (isValidDate(startDateInputValue)) {
            if (!dayjs(startDate).isSame(dayjs(startDateInputValue))) {
                setStartDate(dayjs(startDateInputValue));
            }
        } else {
            setStartDateInputValue(formatDate(startDate));
        }
    }

    function onEndDateBlur() {
        if (isValidDate(endDateInputValue)) {
            if (!dayjs(endDate).isSame(dayjs(endDateInputValue))) {
                setEndDate(dayjs(endDateInputValue));
            }
        } else {
            setEndDateInputValue(formatDate(endDate));
        }
    }
    function onEndTimeBlur() {
        const time = endTimeInputValue.trim().toUpperCase();
        if (isValidTime(time)) {
            const [hour, minute, period] = time.match(/(\d{1,2}):(\d{1,2})(?:\s)?([AP]M)/).slice(1);

            let hour24 = parseInt(hour, 10);
            if (period === "PM" && hour24 !== 12) {
                hour24 += 12;
            } else if (period === "AM" && hour24 === 12) {
                hour24 = 0;
            }

            const endTime = dayjs(endDate).set('hour', hour24).set('minute', parseInt(minute, 10));
            if (!dayjs(endDate).isSame(endTime)) {
                setEndDate(endTime);
            }
        } else {
            console.log("non valid time", endTimeInputValue);
            setEndTimeInputValue(formatTime(endDate));
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
                onSelect={onSelect}
                fullCellRender={cellRender}
                headerRender={() => <div></div>}
                locale={customLocale}
            />
            <article className="start-date">
                <label className={`section-label ${focusedInput === "start" ? "selected" : ""}`}>Start Date</label>
                <div className="input-wrapper">
                    <Checkbox onChange={onStartDateCheck} value={!!startDate} className="date-checkbox" />
                    {!startDate &&
                        <span className="empty-date">M/D/YYYY</span>
                    }
                    {startDate &&
                        <Input
                            ref={startDateRef}
                            className={`custom-input ${focusedInput === "start" ? "focused" : ""}`}
                            value={startDateInputValue}
                            onChange={(e) => setStartDateInputValue(e.target.value)}
                            onBlur={onStartDateBlur}
                            onFocus={() => setFocusedInput("start")}
                        />
                    }
                </div>
            </article>
            <article className="end-date ">
                <label className={`section-label ${focusedInput === "end" ? "selected" : ""}`}>End Date</label>
                <div className="input-wrapper">
                    <Checkbox onChange={onEndDateCheck} checked={!!endDate} className="date-checkbox" />
                    {!endDate &&
                        <>
                            <span className="empty-date">M/D/YYYY</span>
                            <span className="empty-date">hh:mm a</span>
                        </>
                    }
                    {endDate &&
                        <>
                            <Input
                                ref={endDateRef}
                                className={`custom-input ${focusedInput === "end" ? "focused" : ""}`}
                                value={endDateInputValue}
                                onChange={(e) => setEndDateInputValue(e.target.value)}
                                onBlur={onEndDateBlur}
                                onFocus={() => setFocusedInput("end")}
                            />
                            <Input
                                ref={endTimeRef}
                                className={`custom-input ${focusedInput === "endTime" ? "focused" : ""}`}
                                value={endTimeInputValue}
                                onChange={(e) => setEndTimeInputValue(e.target.value)}
                                onBlur={onEndTimeBlur}
                                onFocus={() => setFocusedInput("endTime")}
                            />
                        </>
                    }
                </div>
            </article>
        </Card>
    )
}

function formatDate(date) {
    return date.format('M/D/YYYY');
}
function formatTime(date) {
    return date.format('hh:mm') + " " + date.format('A');
}
function isValidDate(date) {
    return dayjs(date).isValid();
}
function isValidTime(time) {
    return /^\d{1,2}:\d{1,2} [AP]M$/.test(time);
}