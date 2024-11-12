import React, { useContext, useEffect, useState } from 'react';
import s from './Register.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, registerUser } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { AiOutlineUser, AiOutlineLock, AiOutlinePhone } from 'react-icons/ai';
import { ThemeContext } from '../../components/ThemeContext/ThemeContext';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', phone: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Валидация
    const newErrors = { username: '', phone: '', password: '' };
    if (!username) newErrors.username = 'Username is required';
    if (!/^\+?\d{10,15}$/.test(phone)) newErrors.phone = 'Invalid phone number';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
    setErrors(newErrors);

    if (!newErrors.username && !newErrors.phone && !newErrors.password) {
      dispatch(registerUser({ username, phone, password }));
      setUsername('');
      setPhone('');
      setPassword('');
      toast.success('Registration successful!');
    } else {
      toast.error('Please correct the errors');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${s.form} ${theme === 'dark' ? s.dark : s.light}`}>
      <h1 className={s.title}>Registration</h1>
      <label>
        <AiOutlineUser className={s.icon} />
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`${s.input} ${theme === 'dark' ? s.dark : s.light}`}
          autoComplete="username"
        />
        {errors.username && <p className="error-text">{errors.username}</p>}
      </label>
      <label>
        <AiOutlinePhone className={s.icon} />
        <input
          type="text"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={`${s.input} ${theme === 'dark' ? s.dark : s.light}`}
          autoComplete="phone"
        />
        {errors.phone && <p className="error-text">{errors.phone}</p>}
      </label>
      <label>
        <AiOutlineLock className={s.icon} />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${s.input} ${theme === 'dark' ? s.dark : s.light}`}
          autoComplete="new-password"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
      </label>
      <div className={s.actions}>
        <button type="submit" className={s.button}>Submit</button>
        <Link to="/login" className={`${s.link} ${theme === 'dark' ? s.dark : s.light}`}>Already have an account?</Link>
      </div>
    </form>
  );
};

export default RegisterPage;
