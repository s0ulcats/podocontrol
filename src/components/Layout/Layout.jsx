import React, { useContext } from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import s from './Layout.module.scss';
import { ThemeContext } from '../ThemeContext/ThemeContext';

const Layout = ({ children }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`${s.container} ${theme === 'dark' ? s.dark : s.light}`}>
            <Navbar />
            <div className={`${s.content} ${theme === 'dark' ? s.darkContent : s.lightContent}`}>
                {children}
            </div>
        </div>
    );
};

export default Layout;
