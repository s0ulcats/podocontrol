import React, { useState, useEffect, useContext } from 'react';
import s from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, loginUser } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { AiOutlineLock, AiOutlinePhone } from 'react-icons/ai';
import { ThemeContext } from '../../components/ThemeContext/ThemeContext';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { status } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(checkIsAuth);
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [status, isAuth, navigate]);

  const handleSubmit = async () => {
    try {
        const response = await dispatch(loginUser({ phone, password })).unwrap();
        if (response.message) {
            toast.error(response.message);
        } else {
            toast.success(t('auth.login_success'));
        }
        setPhone('');
        setPassword('');
    } catch (error) {
        toast.error(t('auth.invalid_credentials'));
    }
};

  return (
    <form onSubmit={(e) => e.preventDefault()} className={`${s.form} ${theme === 'dark' ? s.dark : s.light}`}>
      <h1 className={s.title}>{t('auth.authorization')}</h1>
      <label className={s.label}>
        <AiOutlinePhone className={s.icon} />
        {t('auth.phone_number')}:
        <input
          type="text"
          placeholder={t('forms.placeholders.phone')}
          value={phone}
          className={`${s.input} ${theme === 'dark' ? s.dark : s.light}`}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="phone"
        />
      </label>
      <label className={s.label}>
        <AiOutlineLock className={s.icon} />
        {t('auth.password')}:
        <input
          type="password"
          placeholder={t('forms.placeholders.password')}
          value={password}
          className={`${s.input} ${theme === 'dark' ? s.dark : s.light}`}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </label>

      <div className={s.buttonGroup}>
        <button type='submit' className={s.submitButton} onClick={handleSubmit}>
          {t('buttons.enter')}
        </button>
        <Link to={'/register'} className={`${s.link} ${theme === 'dark' ? s.dark : s.light}`}>
          {t('auth.no_account')}
        </Link>
      </div>
    </form>
  );
};

export default LoginPage;
