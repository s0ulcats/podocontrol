import React, { useContext } from 'react';
import s from './RecordingsPage.module.scss';
import { ThemeContext } from '../../components/ThemeContext/ThemeContext';
import Calendar from '../../components/calendar/Calendar.jsx';
import { useTranslation } from 'react-i18next';

const RecordingsPage = () => {
  const { t } = useTranslation(); // Инициализация t для перевода
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${s.recordingsPage} ${theme === 'dark' ? s.dark : s.light}`}>
      <h1>{t('navigation.recordings')}</h1> 
      <Calendar procedureTitle={t('booking.selected_procedure')} /> 
    </div>
  );
};

export default RecordingsPage;
