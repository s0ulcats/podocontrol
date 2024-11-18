import React, { useState, useRef, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRecording, getRecordings } from '../../redux/features/recording/recordingSlice';
import s from './Calendar.module.scss';
import cn from 'classnames';
import * as calendar from './calendar';
import { ThemeContext } from '../ThemeContext/ThemeContext';
import { getMe } from '../../redux/features/auth/authSlice';

const Calendar = ({
  date = new Date(),
  years = [2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031],
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  weekDayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  onChange = Function.prototype,
  procedureTitle
}) => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [state, setState] = useState({ date, currentDate: new Date(), selectedDate: null });
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDateText, setSelectedDateText] = useState('');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [viewBookingDetails, setViewBookingDetails] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [phoneTooltipVisible, setPhoneTooltipVisible] = useState(false);
  const phone = useSelector((state) => state.auth.user?.phone);
  const username = useSelector((state) => state.auth.user?.username);
  const { user: authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const recordings = useSelector(state => state.recording.recordings);
  const monthSelect = useRef(null);
  const yearSelect = useRef(null);

  const year = state.date.getFullYear();
  const month = state.date.getMonth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !authUser) {
      dispatch(getMe());
    }
  }, [dispatch, authUser]);

  useEffect(() => {
    dispatch(getRecordings());
  }, [dispatch]);

  const handlePrevMonth = () => setState({ ...state, date: new Date(year, month - 1) });
  const handleNextMonth = () => setState({ ...state, date: new Date(year, month + 1) });
  const handleSelectChange = () => {
    const newYear = yearSelect.current.value;
    const newMonth = monthSelect.current.value;
    setState({ ...state, date: new Date(newYear, newMonth) });
  };

  const showTooltip = () => setTooltipVisible(true);
  const hideTooltip = () => setTooltipVisible(false);
  const showPhoneTooltip = () => setPhoneTooltipVisible(true);
  const hidePhoneTooltip = () => setPhoneTooltipVisible(false);



  const handleDayClick = (selectedDate) => {
    setState({ ...state, selectedDate });
    onChange(selectedDate);

    if (selectedDate) {
      const formattedDate = `${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;
      setSelectedDateText(formattedDate);
      generateTimeSlots(selectedDate);
      setShowTimeSlots(true);
    }
  };

  const generateTimeSlots = (selectedDate) => {
    const slots = [];
    let start = new Date(selectedDate);
    start.setHours(8, 0, 0, 0);

    const endTime = new Date(selectedDate);
    endTime.setHours(19, 30, 0, 0);

    while (start <= endTime) {
      slots.push(start.toTimeString().slice(0, 5));
      start = new Date(start.getTime() + 1.5 * 60 * 60 * 1000);
    }

    setTimeSlots(slots);
  };

  const handleTimeSlotClick = (time) => {
    setSelectedTime(time);
    setShowRegistrationForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecording = {
      username,
      phone,
      date: selectedDateText,
      time: selectedTime,
      procedure: procedureTitle,
    };

    dispatch(createRecording(newRecording));
    setShowRegistrationForm(false);
  };

  const monthData = calendar.getMonthDate(year, month);

  return (
    <div className={cn(s.calendar, { [s.dark]: theme === 'dark', [s.light]: theme === 'light' })}>
      <header>
        <button onClick={handlePrevMonth}>{'<'}</button>
        <select onChange={handleSelectChange} ref={monthSelect} value={month}>
          {monthNames.map((name, idx) => <option key={name} value={idx}>{name}</option>)}
        </select>
        <select onChange={handleSelectChange} ref={yearSelect} value={year}>
          {years.map(year => <option key={year} value={year}>{year}</option>)}
        </select>
        <button onClick={handleNextMonth}>{'>'}</button>
      </header>

      <table>
        <thead>
          <tr>
            {weekDayNames.map(name => <th key={name}>{name}</th>)}
          </tr>
        </thead>
        <tbody>
          {monthData.map((week, idx) => (
            <tr key={idx} className={s.week}>
              {week.map((date, idx) => date ?
                <td
                  key={idx}
                  className={cn(s.day, {
                    [s.today]: calendar.areEqual(date, state.currentDate),
                    [s.selected]: calendar.areEqual(date, state.selectedDate)
                  })}
                  onClick={() => handleDayClick(date)}
                >
                  {date.getDate()}
                </td>
                : <td key={idx} />
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedDateText && <h3 className={s.selectedDateText}>{selectedDateText}</h3>}

      {showTimeSlots && (
        <div className={s.timeSlots}>
          {timeSlots.map((time, idx) => {
            const booking = recordings.find(
              (app) => app.date === selectedDateText && app.time === time
            );

            return (
              <div
                key={idx}
                className={cn(s.timeSlot, { [s.booked]: !!booking })}
                onClick={
                  booking
                    ? () => setViewBookingDetails(booking) // Открыть форму с деталями записи
                    : () => handleTimeSlotClick(time) // Открыть форму записи
                }
              >
                {time}
                {booking && <span className={s.booked}> (Занято)</span>}
              </div>
            );
          })}
        </div>
      )}

      {(phone === '0668445985' || phone === '0507335098') && viewBookingDetails && (
        <div className={s.modal}>
          <div className={s.modalContent}>
            <h2>Детали записи</h2>
            <p><strong>Имя:</strong> {viewBookingDetails.username}</p>
            <p><strong>Телефон:</strong> {viewBookingDetails.phone}</p>
            <p><strong>Процедура:</strong> {viewBookingDetails.procedure}</p>
            <p><strong>Дата:</strong> {viewBookingDetails.date}</p>
            <p><strong>Время:</strong> {viewBookingDetails.time}</p>
            <button onClick={() => setViewBookingDetails(null)}>Закрыть</button>
          </div>
        </div>
      )}


      {showRegistrationForm && (
        <div className={s.modal}>
          <form onSubmit={handleSubmit}>
            <h2>Запись</h2>
            <label
              onMouseEnter={showTooltip}
              onMouseLeave={hideTooltip}
              className={s.tooltipContainer}
            >
              Имя Фамилия:
              <input
                type="text"
                value={username}
                placeholder={username}
                required
                disabled
              />
              {tooltipVisible && (
                <span className={s.tooltip}>
                  Если это указано не ваше имя, поменяйте его в настройках.
                </span>
              )}
            </label>

            <label
              onMouseEnter={showPhoneTooltip}
              onMouseLeave={hidePhoneTooltip}
              className={s.tooltipContainer}
            >
              Телефон:
              <input
                type="tel"
                value={phone}
                placeholder={phone}
                required
                disabled
              />
              {phoneTooltipVisible && (
                <span className={s.tooltip}>
                  Если это не ваш номер телефона, измените его в настройках.
                </span>
              )}
            </label>

            <label>Процедура:
              <input type="text" value={procedureTitle} disabled />
            </label>

            <label>Время:
              <input type="text" value={selectedTime} disabled />
            </label>
            <button type="submit" disabled={!selectedTime || !username || !phone}>Подтвердить</button>
            <button type="button" onClick={() => setShowRegistrationForm(false)}>Отмена</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Calendar;
