import { Popover, Calendar, Card, Input, Checkbox } from "antd";
import { ManageTaskPopoverHeader } from "./ManageTaskPopoverHeader";
import dayjs from "dayjs";
import { useState, useRef, useEffect } from "react";
import { SvgButton } from "../../CustomCpms/SvgButton";
import { CustomSelect } from "../../CustomCpms/CustomSelect";
import { utilService } from "../../../services/util.service";
import { useSelector } from "react-redux";

const customLocale = {
  lang: {
    locale: "en",
    shortWeekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
};

export function ManageDatesPopover({ anchorEl, task, editTask, editBoard }) {
  const [isOpen, setIsOpen] = useState(false);

  function onClose() {
    setIsOpen(false);
  }

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger="click"
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      content={
        <ManageDatesPopoverContent
          editBoard={editBoard}
          task={task}
          editTask={editTask}
          onClose={onClose}
        />
      }
      placement="right"
    >
      {anchorEl}
    </Popover>
  );
}

function ManageDatesPopoverContent({ task, editTask, onClose, editBoard }) {
  const [value, setValue] = useState(dayjs());
  const board = useSelector((state) => state.boardModule.board);
  const user = useSelector((state) => state.userModule.user);

  const [startDate, setStartDate] = useState(null);
  const [startDateInputValue, setStartDateInputValue] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [lastSelectedStartDate, setLastSelectedStartDate] = useState(null);

  const [endDate, setEndDate] = useState(null);
  const [endDateInputValue, setEndDateInputValue] = useState("");
  const [endTimeInputValue, setEndTimeInputValue] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [lastSelectedEndDate, setLastSelectedEndDate] = useState(null);

  const [focusedInput, setFocusedInput] = useState("end"); //end endTime or start or "none"

  const [reminder, setReminder] = useState(task.dueReminder || "none");

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const endTimeRef = useRef(null);

  useEffect(() => {
    const defaultEndDate = task.due ? dayjs(task.due) : dayjs().add(1, "day");

    if (task.start && !task.due) {
      setStartDate(dayjs(task.start));
      setValue(dayjs(task.start));
      setSelectedStartDate(dayjs(task.start));
      setFocusedInput("start");
    }
    if (task.due && !task.start) {
      setEndDate(dayjs(task.due));
      setValue(dayjs(task.due));
      setSelectedEndDate(dayjs(task.due));
      setFocusedInput("end");
    }
    if (task.start && task.due) {
      setStartDate(dayjs(task.start));
      setEndDate(dayjs(task.due));
      setSelectedStartDate(dayjs(task.start));
      setSelectedEndDate(dayjs(task.due));
      setFocusedInput("end");
    }
    if (!task.start && !task.due) {
      setEndDate(dayjs().add(1, "day"));
      setSelectedEndDate(dayjs().add(1, "day"));
      setFocusedInput("end");
    }
  }, []);

  useEffect(() => {
    if (!dayjs(selectedStartDate).isSame(startDate)) {
      setStartDate(selectedStartDate);
      if (
        selectedEndDate &&
        dayjs(selectedEndDate).isBefore(selectedStartDate)
      ) {
        setSelectedEndDate(dayjs(selectedStartDate).add(1, "day"));
      }
    }
    if (
      selectedStartDate &&
      !dayjs(selectedStartDate).isSame(lastSelectedStartDate)
    ) {
      setLastSelectedStartDate(selectedStartDate);
    }
  }, [selectedStartDate]);

  useEffect(() => {
    if (!selectedEndDate) return;

    const currentHour = endDate?.hour() || 0;
    const currentMinute = endDate?.minute() || 0;
    if (!endDate || !isSameDay(selectedEndDate, endDate)) {
      const newEndDate = selectedEndDate
        .set("hour", currentHour)
        .set("minute", currentMinute);
      setEndDate(newEndDate);
      if (
        selectedStartDate &&
        dayjs(selectedEndDate).isBefore(selectedStartDate)
      ) {
        setSelectedStartDate(dayjs(selectedEndDate).subtract(1, "day"));
      }
    }

    if (!isSameDay(selectedEndDate, lastSelectedEndDate)) {
      setLastSelectedEndDate(selectedEndDate);
    }
  }, [selectedEndDate]);

  useEffect(() => {
    if (startDate) {
      setStartDateInputValue(startDate.format("M/D/YYYY"));
      setFocusedInput("start");
    } else {
      setStartDateInputValue("");
      setFocusedInput("none");
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate) {
      setEndDateInputValue(formatDate(endDate));
      setEndTimeInputValue(formatTime(endDate));
      if (!dayjs(endDate).isSame(value)) {
        setValue(endDate);
      }
    } else {
      setEndDateInputValue("");
      setEndTimeInputValue("");
      if (startDate) {
        setFocusedInput("start");
      } else {
        setFocusedInput("none");
      }
    }
  }, [endDate]);

  function onSelect(value) {
    if (focusedInput === "start") {
      setSelectedStartDate(value);
    } else {
      setSelectedEndDate(value);
      setFocusedInput("end");
    }
  }

  function prevMonth() {
    const newValue = value.subtract(1, "month");
    setValue(newValue);
  }

  function nextMonth() {
    const newValue = value.add(1, "month");
    setValue(newValue);
  }

  function dateCellRender(current) {
    const isToday = current.isSame(dayjs(), "day");
    const isSelected =
      current.isSame(selectedStartDate, "day") ||
      current.isSame(selectedEndDate, "day");
    const isInRange =
      selectedStartDate &&
      selectedEndDate &&
      current.isAfter(selectedStartDate, "day") &&
      current.isBefore(selectedEndDate, "day");

    return (
      <div
        className={`calendar-view__day-cell ${isToday && "today"} ${
          isSelected && "selected"
        } ${isInRange && "in-range"}`}
      >
        <label className="date-label">
          {current.date()}
          <span className="today-indicator"></span>
        </label>
      </div>
    );
  }

  function cellRender(day, info) {
    if (info.type === "date") return dateCellRender(day);
    return info.originNode;
  }

  function onStartDateCheck(e) {
    e.preventDefault();
    if (e.target.checked) {
      setFocusedInput("start");
      if (
        lastSelectedStartDate &&
        dayjs(lastSelectedStartDate).isBefore(selectedEndDate)
      ) {
        setSelectedStartDate(lastSelectedStartDate);
      } else {
        if (endDate) {
          setSelectedStartDate(dayjs(endDate).subtract(1, "day"));
          setStartDate(dayjs(endDate).subtract(1, "day"));
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
      if (
        lastSelectedEndDate &&
        (dayjs(lastSelectedEndDate).isAfter(selectedStartDate) ||
          !selectedStartDate)
      ) {
        setSelectedEndDate(lastSelectedEndDate);
        setEndDate(lastSelectedEndDate);
      } else {
        setSelectedEndDate(
          startDate ? dayjs(startDate).add(1, "day") : dayjs()
        );
        setEndDate(startDate ? dayjs(startDate).add(1, "day") : dayjs());
      }
    } else {
      setEndDate(null);
      setSelectedEndDate(null);
      setFocusedInput("start");
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
      if (!isSameDay(endDate, dayjs(endDateInputValue))) {
        const currentHour = endDate?.hour() || 0;
        const currentMinute = endDate?.minute() || 0;
        const newEndDate = dayjs(endDateInputValue)
          .set("hour", currentHour)
          .set("minute", currentMinute);
        setEndDate(newEndDate);
      }
    } else {
      setEndDateInputValue(formatDate(endDate));
    }
  }

  function onEndTimeBlur() {
    const time = endTimeInputValue.trim().toUpperCase();
    if (isValidTime(time)) {
      const [hour, minute, period] = time
        .match(/(\d{1,2}):(\d{1,2})(?:\s)?([AP]M)/)
        .slice(1);

      let hour24 = parseInt(hour, 10);
      if (period === "PM" && hour24 !== 12) {
        hour24 += 12;
      } else if (period === "AM" && hour24 === 12) {
        hour24 = 0;
      }

      const endTime = dayjs(endDate)
        .set("hour", hour24)
        .set("minute", parseInt(minute, 10));

      if (!endTime.isSame(endDate)) {
        const currentHour = endTime?.hour() || 0;
        const currentMinute = endTime?.minute() || 0;
        const newEndDate = endDate
          .set("hour", currentHour)
          .set("minute", currentMinute);
        setEndDate(newEndDate);
      }
    } else {
      setEndTimeInputValue(formatTime(endDate));
    }
  }

  function onSelectReminder(e) {
    setReminder(e.id);
  }

  async function onSave() {
    const newActivity = utilService.createActivity(
      {
        type: "addDate",
        targetId: task.id,
        targetName: task.name,
        doDate: new Date(endDate["$d"]).getTime(),
      },
      user
    );

    await editBoard({
      ...board,
      activities: [...board.activities, newActivity],
    });
    editTask({
      ...task,
      due: endDate,
      start: startDate,
      dueReminder: reminder,
    });
    onClose();
  }

  async function onRemove() {
    const newActivity = utilService.createActivity(
      {
        type: "addDate",
        targetId: task.id,
        targetName: task.name,
      },
      user
    );
    await editBoard({
      ...board,
      activities: [...board.activities, newActivity],
    });
    editTask({
      ...task,
      due: null,
      start: null,
      dueReminder: null,
      dueComplete: false,
    });
    onClose();
  }

  return (
    <section className="manage-dates-content">
      <ManageTaskPopoverHeader title="Dates" close={onClose} />
      <main className="manage-dates-main">
        <header className="calendar-controller">
          <SvgButton
            src="/img/taskActionBtns/arrowLeftIcon.svg"
            className="btn back-btn"
            onClick={prevMonth}
          />
          <label className="label">{value.format("MMMM YYYY")}</label>
          <SvgButton
            src="/img/taskActionBtns/arrowLeftIcon.svg"
            className="btn next-btn"
            onClick={nextMonth}
          />
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
          <label
            className={`section-label ${
              focusedInput === "start" ? "selected" : ""
            }`}
          >
            Start Date
          </label>
          <div className="input-wrapper">
            <Checkbox
              onChange={onStartDateCheck}
              checked={!!startDate}
              className="date-checkbox"
            />
            {!startDate && <span className="empty-date">M/D/YYYY</span>}
            {startDate && (
              <Input
                ref={startDateRef}
                className={`custom-input ${
                  focusedInput === "start" ? "focused" : ""
                }`}
                value={startDateInputValue}
                onChange={(e) => setStartDateInputValue(e.target.value)}
                onBlur={onStartDateBlur}
                onFocus={() => setFocusedInput("start")}
              />
            )}
          </div>
        </article>
        <article className="end-date ">
          <label
            className={`section-label ${
              focusedInput === "end" ? "selected" : ""
            }`}
          >
            End Date
          </label>
          <div className="input-wrapper">
            <Checkbox
              onChange={onEndDateCheck}
              checked={!!endDate}
              className="date-checkbox"
            />
            {!endDate && (
              <>
                <span className="empty-date">M/D/YYYY</span>
                <span className="empty-date">hh:mm a</span>
              </>
            )}
            {endDate && (
              <>
                <Input
                  ref={endDateRef}
                  className={`custom-input ${
                    focusedInput === "end" ? "focused" : ""
                  }`}
                  value={endDateInputValue}
                  onChange={(e) => setEndDateInputValue(e.target.value)}
                  onBlur={onEndDateBlur}
                  onFocus={() => setFocusedInput("end")}
                />
                <Input
                  ref={endTimeRef}
                  className={`custom-input ${
                    focusedInput === "endTime" ? "focused" : ""
                  }`}
                  value={endTimeInputValue}
                  onChange={(e) => setEndTimeInputValue(e.target.value)}
                  onBlur={onEndTimeBlur}
                  onFocus={() => setFocusedInput("endTime")}
                />
              </>
            )}
          </div>
        </article>
        <article className="set-due-date-reminder">
          <label
            className={`section-label ${
              focusedInput === "start" ? "selected" : ""
            }`}
          >
            Set due date reminder
          </label>
          <CustomSelect
            options={getReminderOptions()}
            value={reminder}
            onSelect={onSelectReminder}
            optionsClassName="custom-reminder-options"
          />
          <p className="reminder-description">
            Reminders will be sent to all members and watchers of this card
          </p>
        </article>
        <article className="date-btns">
          <button className="btn save" onClick={onSave}>
            Save
          </button>
          <button className="btn remove" onClick={onRemove}>
            Remove
          </button>
        </article>
      </main>
    </section>
  );
}

function formatDate(date) {
  return date.format("M/D/YYYY");
}
function formatTime(date) {
  return date.format("hh:mm") + " " + date.format("A");
}
function isValidDate(date) {
  return dayjs(date).isValid();
}
function isValidTime(time) {
  return /^\d{1,2}:\d{1,2} [AP]M$/.test(time);
}
function isSameDay(date1, date2) {
  return (
    date1.isSame(date2, "day") &&
    date1.isSame(date2, "month") &&
    date1.isSame(date2, "year")
  );
}
function getReminderOptions() {
  return [
    { name: "None", id: "none" },
    { name: "At time due date", id: "at_time_due_date" },
    { name: "5 Minutes before", id: "5_minutes_before" },
    { name: "10 Minutes before", id: "10_minutes_before" },
    { name: "15 Minutes before", id: "15_minutes_before" },
    { name: "1 Hour before", id: "1_hour_before" },
    { name: "2 Hours before", id: "2_hours_before" },
    { name: "1 Day before", id: "1_day_before" },
    { name: "2 Days before", id: "2_days_before" },
  ];
}
