import React, { useState, useEffect, useContext } from 'react';
import s from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, loginUser } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { ThemeContext } from '../../components/ThemeContext/ThemeContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { status } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(checkIsAuth);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [status, isAuth, navigate]);

  const handleSubmit = async () => {
    try {
      await dispatch(loginUser({ username, password })).unwrap();
      setUsername('');
      setPassword('');
    } catch (error) {
      toast.error('Invalid Credentials');
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className={`${s.form} ${theme === 'dark' ? s.dark : s.light}`}>
      <h1 className={s.title}>Authorization</h1>
      <label className={s.label}>
        <AiOutlineUser className={s.icon} />
        Login:
        <input
          type="text"
          placeholder='Login'
          value={username}
          className={`${s.input} ${theme === 'dark' ? s.dark : s.light}`}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
      </label>
      <label className={s.label}>
        <AiOutlineLock className={s.icon} />
        Password:
        <input
          type="password"
          placeholder='Password'
          value={password}
          className={`${s.input} ${theme === 'dark' ? s.dark : s.light}`}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </label>

      <div className={s.buttonGroup}>
        <button type='submit' className={s.submitButton} onClick={handleSubmit}>Enter</button>
        <Link to={'/register'} className={`${s.link} ${theme === 'dark' ? s.dark : s.light}`}>Do not have an account?</Link>
      </div>
    </form>
  );
};

export default LoginPage;
