import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserById, updateAccountData } from '../../redux/features/users/usersSlice';
import s from './UpdateUsernamePage.module.scss';
import { AiOutlineEdit, AiOutlineCheck, AiOutlineClose, AiOutlineUser, AiOutlinePhone } from 'react-icons/ai';
import { ThemeContext } from '../../components/ThemeContext/ThemeContext';

const UpdateUsername = ({ initialUsername, initialPhone, userId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState(initialUsername || '');
    const [phone, setPhone] = useState(initialPhone || '');
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleSettingsChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') setUsername(value);
        if (name === 'phone') setPhone(value);
    };

    const handleSave = () => {
        setIsEditing(false);
        if (username !== initialUsername || phone !== initialPhone) {
            dispatch(updateAccountData({ id: userId, params: { username: username || 'undf', phone: phone || 'undf' } }))
                .then(() => dispatch(getUserById(userId)));
        }
    };

    return (
        <div className={`${s.statusEditor} ${theme === 'dark' ? s.dark : s.light}`} onDoubleClick={handleDoubleClick}>
            {isEditing ? (
                <div className={s.editContainer}>
                    <div className={s.field}>
                        <AiOutlineUser className={s.icon} />
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleSettingsChange}
                            autoFocus
                            className={`${s.input} ${theme === 'dark' ? s.dark : s.light}`}
                        />
                        <AiOutlineCheck className={s.icon} onClick={handleSave} />
                        <AiOutlineClose className={s.icon} onClick={() => { setUsername(initialUsername); setPhone(initialPhone); setIsEditing(false); }} />
                    </div>
                    <div className={s.field}>
                        <AiOutlinePhone className={s.icon} />
                        <input
                            type="text"
                            name="phone"
                            value={phone}
                            onChange={handleSettingsChange}
                            className={`${s.input} ${theme === 'dark' ? s.dark : s.light}`}
                        />
                    </div>
                </div>
            ) : (
                <div className={s.statusDisplay}>
                    <div className={s.field}>
                        <AiOutlineUser className={s.icon} />
                        <span className={s.statusText}>{username || 'undf'}</span>
                        <AiOutlineEdit className={s.icon} onClick={handleDoubleClick} />
                    </div>
                    <div className={s.field}>
                        <AiOutlinePhone className={s.icon} />
                        <span className={s.statusText}>{phone || 'undf'}</span>
                        <AiOutlineEdit className={s.icon} onClick={handleDoubleClick} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateUsername;
