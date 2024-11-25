import React, { useState } from 'react';
import Moment from 'react-moment';
import { AiOutlineUser, AiOutlineClockCircle } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import s from './MessageItem.module.scss';

const MessageItem = ({ message }) => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    if (!message || !message.author) {
        return <p className={s.errorMessage}>{t('messages.message_unavailable')}</p>;
    }

    const openImageModal = (imgUrl) => {
        setSelectedImage(imgUrl);
        setIsModalOpen(true);
    };

    const closeImageModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    return (
        <div className={s.messageContainer}>
            <p className={s.author}>
                <AiOutlineUser className={s.icon} />
                {message.author.username}
            </p>
            <p className={s.messageText}>
                {message.message}
            </p>
            {message.imgUrl && (
                <div className={s.imageWrapper}>
                    <img 
                        src={`http://localhost:3001/${message.imgUrl}`} 
                        alt={t('messages.attached')} 
                        className={s.messageImage} 
                        onClick={() => openImageModal(`http://localhost:3001/${message.imgUrl}`)} 
                    />
                </div>
            )}
            <div className={s.timestampContainer}>
                <AiOutlineClockCircle className={s.icon} />
                <Moment date={message.createdAt} format="D MMM YYYY" className={s.timeStamp} />
            </div>

            {isModalOpen && (
                <div className={s.modal} onClick={closeImageModal}>
                    <div className={s.modalContent}>
                        <img 
                            src={selectedImage} 
                            alt={t('messages.attached')} 
                            className={s.modalImage} 
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessageItem;
