import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/features/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import s from './UsersPage.module.scss';
import { AiOutlineUser } from 'react-icons/ai';
import Preloader from '../../components/Preloader/Preloader';
import { ThemeContext } from '../../components/ThemeContext/ThemeContext';
import { useTranslation } from 'react-i18next';

const UsersPage = () => {
  const { t } = useTranslation(); // Инициализируем t для перевода
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.user);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  if (loading) return <Preloader />;
  if (error) return <p className={s.error}>{t('messages.error_message', { error })}</p>; // Перевод ошибки с параметром

  const handleUserClick = (id) => {
    navigate(`/user/${id}`);
  };

  return (
    <div className={`${s.container} ${theme === 'dark' ? s.dark : s.light}`}>
      <h1 className={s.title}>{t('users_page.users_page_title')}</h1> {/* Перевод заголовка */}
      <div className={s.userGrid}>
        {users.length ? (
          users.map((user) => (
            <div
              key={user._id}
              onClick={() => handleUserClick(user._id)}
              className={`${s.userCard} ${theme === 'dark' ? s.dark : s.light}`}
            >
              <div className={`${s.avatar} ${theme === 'dark' ? s.dark : s.light}`}>
                <AiOutlineUser className={s.userIcon} />
              </div>
              <div className={s.userInfo}>
                <div className={s.username}>{user.username || t('messages.unknown_user')}</div> {/* Добавлено fallback для имени */}
                <div className={s.phone}>{user.phone || t('messages.unknown_user')}</div>
              </div>
            </div>
          ))
        ) : (
          <p>{t('users_page.no_users_found')}</p>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
