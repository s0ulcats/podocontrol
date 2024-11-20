import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../redux/features/users/usersSlice';
import Preloader from '../../components/Preloader/Preloader';
import { ThemeContext } from '../../components/ThemeContext/ThemeContext';
import UpdateUsername from './UpdateUsernamePage.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import s from './ProfilePage.module.scss';

const ProfilePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const { user: authUser } = useSelector((state) => state.auth);
  const { user: myProfile, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
      return;
    }
    if (authUser._id && !myProfile) {
      dispatch(getUserById(authUser._id));
    }
  }, [dispatch, authUser, myProfile, id, navigate]);

  if (loading) return <Preloader />;
  if (error) return <p className={s.error}>{t('posts.error_message', { error })}</p>;

  if (!authUser || !myProfile) {
    return <p className={s.profileNotFound}>{t('messages.message_unavailable')}</p>;
  }

  return (
    <div className={`${s.container} ${theme === 'dark' ? s.dark : s.light}`}>
      <div className={s.userCard}>
        <div className={s.avatar}>{myProfile.username.charAt(0).toUpperCase()}</div>
        <UpdateUsername
          initialUsername={myProfile.username}
          initialPhone={myProfile.phone}
          userId={myProfile._id}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
