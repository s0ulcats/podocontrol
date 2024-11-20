import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, logout, getMe } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { AiOutlineHome, AiOutlineUser, AiOutlineFileAdd, AiOutlineMoon, AiFillSun, AiFillSetting } from 'react-icons/ai';
import Logo from './Logo.png';
import { useTranslation } from 'react-i18next';
import s from './Navbar.module.scss';
import { ThemeContext } from '../ThemeContext/ThemeContext';

const Navbar = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(checkIsAuth);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const { user: authUser } = useSelector((state) => state.auth);
    const phone = useSelector((state) => state.auth.user?.phone);
    const { t, i18n } = useTranslation();

    const [language, setLanguage] = useState('en');  // State to manage current language
    const activeStyles = {
        color: '#ff79a9',
        fontWeight: 'bold',
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !authUser) {
            dispatch(getMe());
        }
    }, [dispatch, authUser]);

    const logoutHandler = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast('Successful log out');
    };

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setLanguage(lang);
        setShowDropdown(false);
    };

    return (
        <div className={`${s.nav} ${theme === 'dark' ? s.dark : s.light}`}>
            <img className={s.icon} src={Logo} alt='Logo' />
            {isAuth && (
                <ul className={`${s.navList} ${theme === 'dark' ? s.dark : s.light}`}>
                    <li>
                        <NavLink
                            style={({ isActive }) => (isActive ? activeStyles : undefined)}
                            to="/"
                            className={`${s.navLink} ${theme === 'dark' ? s.dark : s.light}`}
                        >
                            <AiOutlineHome /> {t('navigation.home')}
                        </NavLink>
                    </li>
                    {(phone === '0668445985' || phone === '0507335098') && (
                        <>
                            <li>
                                <NavLink
                                    style={({ isActive }) => (isActive ? activeStyles : undefined)}
                                    to="/new"
                                    className={`${s.navLink} ${theme === 'dark' ? s.dark : s.light}`}
                                >
                                    <AiOutlineFileAdd /> {t('navigation.add_post')}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    style={({ isActive }) => (isActive ? activeStyles : undefined)}
                                    to="/users"
                                    className={`${s.navLink} ${theme === 'dark' ? s.dark : s.light}`}
                                >
                                    <AiOutlineUser /> {t('navigation.users')}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    style={({ isActive }) => (isActive ? activeStyles : undefined)}
                                    to="/recordings"
                                    className={`${s.navLink} ${theme === 'dark' ? s.dark : s.light}`}
                                >
                                    <AiOutlineUser /> {t('navigation.recordings')}
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            )}
            <div className={s.authContainer}>
                <button
                    onClick={toggleTheme}
                    className={`${s.themeSwitchBtn} ${theme === 'dark' ? s.dark : s.light}`}
                >
                    {theme === 'light' ? <AiOutlineMoon /> : <AiFillSun />}
                </button>

                <NavLink
                    style={({ isActive }) => (isActive ? activeStyles : undefined)}
                    to="/profile"
                    className={`${s.navLink} ${theme === 'dark' ? s.dark : s.light}`}
                >
                    <AiFillSetting />
                </NavLink>

                {isAuth ? (
                    <button
                        className={`${s.btn} ${theme === 'dark' ? s.dark : s.light}`}
                        onClick={logoutHandler}
                    >
                        {t('navigation.logout')}
                    </button>
                ) : (
                    <Link
                        to={'/login'}
                        className={`${s.navLink} ${theme === 'dark' ? s.dark : s.light}`}
                    >
                        {t('buttons.enter')}
                    </Link>
                )}

                <div className={s.languageSwitcher}>
                    <button
                        className={`${s.languageBtn} ${theme === 'dark' ? s.dark : s.light}`}
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        {language.toUpperCase()}
                    </button>
                    {showDropdown && (
                        <div className={s.languageSwitcher}>
                        <button
                          className={`${s.languageBtn} ${theme === 'dark' ? s.dark : s.light}`}
                          onClick={() => setShowDropdown(!showDropdown)}
                        >
                        </button>
                      
                        {showDropdown && (
                          <div className={s.languageDropdown}>
                            <button
                              onClick={() => changeLanguage('en')}
                              className={`${s.languageOption} ${language === 'en' ? s.active : ''}`}
                            >
                              EN
                            </button>
                            <button
                              onClick={() => changeLanguage('ru')}
                              className={`${s.languageOption} ${language === 'ru' ? s.active : ''}`}
                            >
                              RU
                            </button>
                            <button
                              onClick={() => changeLanguage('ua')}
                              className={`${s.languageOption} ${language === 'ua' ? s.active : ''}`}
                            >
                              UA
                            </button>
                          </div>
                        )}
                      </div>                      
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
