import React from 'react';
import s from './ContactModalWindow.module.scss';
import call from './call.gif';

const ContactModalWindow = () => {

    const handleCall = () => {
        window.location.href = 'tel:0507335098';
    };

    return (
        <button className={s.callButton} onClick={handleCall}>
            <img src={call} alt="Call" className={s.callImage} />
        </button>
    );
};

export default ContactModalWindow;
