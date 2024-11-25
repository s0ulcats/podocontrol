import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, logout, getMe } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import {
    AiOutlineHome,
    AiOutlineUser,
    AiOutlineFileAdd,
    AiOutlineMoon,
    AiFillSun,
    AiFillSetting,
    AiOutlineMenu,
} from 'react-icons/ai';
import Logo from './Logo.png';
import { useTranslation } from 'react-i18next';
import s from './Navbar.module.scss';
import { ThemeContext } from '../ThemeContext/ThemeContext';

const Navbar = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(checkIsAuth);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false); // Для переключения языка
    const { user: authUser } = useSelector((state) => state.auth);
    const phone = useSelector((state) => state.auth.user?.phone);
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState('en');
    const activeStyles = { color: '#ff79a9', fontWeight: 'bold' };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !authUser) {
            dispatch(getMe());
        }

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch, authUser]);

    const logoutHandler = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success(t('navigation.logout_success'));
    };

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setLanguage(lang);
        setShowDropdown(false);
    };

    const renderLinks = () => (
        <>
            <NavLink
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
                to="/"
                className={s.navLink}
            >
                <AiOutlineHome /> {t('navigation.home')}
            </NavLink>
            {(phone === '0668445985' || phone === '0507335098') && (
                <>
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyles : undefined)}
                        to="/new"
                        className={s.navLink}
                    >
                        <AiOutlineFileAdd /> {t('navigation.add_post')}
                    </NavLink>
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyles : undefined)}
                        to="/users"
                        className={s.navLink}
                    >
                        <AiOutlineUser /> {t('navigation.users')}
                    </NavLink>
                    <NavLink
                                    style={({ isActive }) => (isActive ? activeStyles : undefined)}
                                    to="/recordings"
                                    className={`${s.navLink} ${theme === 'dark' ? s.dark : s.light}`}
                                >
                                    <AiOutlineUser /> {t('navigation.recordings')}
                                </NavLink>
                </>
            )}
            <NavLink
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
            to="/profile"
            className={s.navLink}>
            <AiFillSetting /> {t('navigation.settings')}
        </NavLink>
        </>
    );

    return (
        <nav className={`${s.nav} ${theme === 'dark' ? s.dark : s.light}`}>
            <div className={s.container}>
                <img className={s.logo} src={Logo} alt="Logo" />
                {isMobile ? (
                    <button
                        className={s.menuToggle}
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                    >
                        <AiOutlineMenu />
                    </button>
                ) : (
                    <div className={s.links}>{renderLinks()}</div>
                )}
                <div className={s.controls}>
                    <button onClick={toggleTheme} className={s.themeSwitch}>
                        {theme === 'light' ? <AiOutlineMoon /> : <AiFillSun />}
                    </button>
                    <div className={s.languageSwitcher}>
                        <button
                            className={s.languageBtn}
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            {language.toUpperCase()}
                        </button>
                        {showDropdown && (
                            <div className={s.languageDropdown}>
                                <button
                                    onClick={() => changeLanguage('en')}
                                    className={`${s.languageOption} ${language === 'en' ? s.active : ''
                                        }`}
                                >
                                    EN
                                </button>
                                <button
                                    onClick={() => changeLanguage('ru')}
                                    className={`${s.languageOption} ${language === 'ru' ? s.active : ''
                                        }`}
                                >
                                    RU
                                </button>
                                <button
                                    onClick={() => changeLanguage('ua')}
                                    className={`${s.languageOption} ${language === 'ua' ? s.active : ''
                                        }`}
                                >
                                    UA
                                </button>
                            </div>
                        )}
                    </div>
                    {isAuth ? (
                        <>
                            <button onClick={logoutHandler} className={s.logoutBtn}>
                                {t('navigation.logout')}
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className={s.loginBtn}>
                            {t('buttons.enter')}
                        </Link>
                    )}
                </div>
            </div>

            {/* Мобильное меню */}
            {isMobile && showMobileMenu && (
                <div className={s.mobileOverlay} onClick={() => setShowMobileMenu(false)}>
                    <div
                        className={`${s.mobileMenu} ${theme === 'dark' ? s.dark : s.light} ${s.mobileMenuOpen}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={s.mobileMenuContent}>{renderLinks()}</div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
