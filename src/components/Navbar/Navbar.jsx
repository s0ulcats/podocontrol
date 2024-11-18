import React, { useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, logout, getMe } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { AiOutlineHome, AiOutlineUser, AiOutlineFileAdd, AiOutlineMoon, AiFillSun, AiFillSetting } from 'react-icons/ai';
import Logo from './Logo.png';
import s from './Navbar.module.scss';
import { ThemeContext } from '../ThemeContext/ThemeContext';

const Navbar = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(checkIsAuth);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { user: authUser } = useSelector((state) => state.auth);
    const phone = useSelector((state) => state.auth.user?.phone);

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
                            <AiOutlineHome /> Home
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
                                    <AiOutlineFileAdd /> Add Post
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    style={({ isActive }) => (isActive ? activeStyles : undefined)}
                                    to="/users"
                                    className={`${s.navLink} ${theme === 'dark' ? s.dark : s.light}`}
                                >
                                    <AiOutlineUser /> Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    style={({ isActive }) => (isActive ? activeStyles : undefined)}
                                    to="/recordings"
                                    className={`${s.navLink} ${theme === 'dark' ? s.dark : s.light}`}
                                >
                                    <AiOutlineUser /> Recordings
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
                        Log out
                    </button>
                ) : (
                    <Link
                        to={'/login'}
                        className={`${s.navLink} ${theme === 'dark' ? s.dark : s.light}`}
                    >
                        Enter
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
