import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Moment from 'react-moment';
import { AiOutlineUser, AiOutlineCalendar } from 'react-icons/ai';
import s from './PostItem.module.scss';
import { ThemeContext } from '../ThemeContext/ThemeContext';
import Preloader from '../Preloader/Preloader';
import { useTranslation } from 'react-i18next';

const DialogItem = ({ dialog }) => {
    const { t } = useTranslation();
    const { theme } = useContext(ThemeContext);
    if (!dialog) {
        return <Preloader />
    }

    return (
        <NavLink to={`/dialog/${dialog._id}`} key={dialog._id} className={s.link}>
            <div className={`${s.dialogItem} ${theme === 'dark' ? s.dark : s.light}`}>
                <div className={s.info}>
                    <div className={s.username}>
                        <AiOutlineUser className={s.icon} />
                        {dialog.username || t('messages.unknown_user')}
                    </div>
                    <div className={s.date}>
                        <AiOutlineCalendar className={s.icon} />
                        <Moment date={dialog.createdAt} format='D MMM YYYY' />
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

export default DialogItem;
