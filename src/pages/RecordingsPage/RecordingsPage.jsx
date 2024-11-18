import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './RecordingsPage.module.scss';
import { ThemeContext } from '../../components/ThemeContext/ThemeContext';
import Calendar from '../../components/calendar/Calendar.jsx';
import Preloader from '../../components/Preloader/Preloader.jsx';
import { getRecordings } from '../../redux/features/recording/recordingSlice.js';

const RecordingsPage = () => {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

  const { recordings, loading, error } = useSelector((state) => state.recording);

  useEffect(() => {
    dispatch(getRecordings());
  }, [dispatch]);

  if (loading) return <Preloader />;

  if (error) return <p className={s.error}>Error: {error}</p>;

  return (
    <div className={`${s.recordingsPage} ${theme === 'dark' ? s.dark : s.light}`}>
      <h1>Записи</h1>
      <Calendar procedureTitle="Выбранная процедура" recordings={recordings} />
    </div>
  );
};

export default RecordingsPage;
