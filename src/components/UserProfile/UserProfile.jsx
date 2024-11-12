import React, { useContext } from 'react';
import s from './UserProfile.module.scss';
import PostItem from '../PostItem/PostItem';
import { useNavigate } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import { ThemeContext } from '../ThemeContext/ThemeContext';

const UserProfile = ({ user, posts }) => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

    if (!user) {
        return <Preloader />;
    }

    const avatar = user.username.trim().toUpperCase().split('').slice(0, 1).join('');
    const userPosts = posts.filter(post => post.author === user._id);

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
                        Direct
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
