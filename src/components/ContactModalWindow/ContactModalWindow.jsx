import React, { useState } from 'react';
import s from './ContactModalWindow.module.scss';
import { TiMessages, TiPhoneOutline } from 'react-icons/ti';
import call from './call.gif';

const ContactModalWindow = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleCall = () => {
        window.location.href = 'tel:0507335098';
    };

    const handleMessage = () => {
        window.open('https://www.instagram.com/podo_control.kharkiv', '_blank');
    };

    const toggleModal = () => setModalOpen(!isModalOpen);

    return (
        <div className={s.callContainer}>
            <button
                className={s.callButton}
                onClick={toggleModal}
            >
                <img src={call} alt="Call" className={s.callImage} />
            </button>

            {isModalOpen && (
                <div className={s.modalOverlay} onClick={toggleModal}>
                    <div
                        className={s.modal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={s.modalContent}>
                            <button
                                className={s.actionButton}
                                onClick={handleCall}
                            >
                                <TiPhoneOutline />
                            </button>
                            <button
                                className={s.actionButton}
                                onClick={handleMessage}
                            >
                                <TiMessages />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactModalWindow;
