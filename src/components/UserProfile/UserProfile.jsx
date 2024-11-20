import React, { useContext } from 'react';
import s from './UserProfile.module.scss';
import { useNavigate } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import { ThemeContext } from '../ThemeContext/ThemeContext';
import { useTranslation } from 'react-i18next'; 

const UserProfile = ({ user }) => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const { t } = useTranslation();

    if (!user) {
        return <Preloader />;
    }

    const avatar = user.username.trim().toUpperCase().split('').slice(0, 1).join('');

    const handleDirectClick = () => {
        navigate(`/dialog/${user._id}`);
    };

    return (
        <div className={`${s.profileContainer} ${theme === 'dark' ? s.dark : s.light}`}>
            <div className={s.info}>
                <div className={s.avatar}>{avatar}</div>
                <div className={s.details}>
                    <div className={s.username}>{user.username}</div>
                    <div className={s.phone}>{user.phone}</div>
                    <div className={s.status}>{user.status || ''}</div>
                    <button className={`${s.directButton} ${theme === 'dark' ? s.dark : s.light}`} onClick={handleDirectClick}>
                        {t('navigation.direct')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
