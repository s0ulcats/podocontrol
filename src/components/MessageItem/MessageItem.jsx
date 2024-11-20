import React from 'react';
import Moment from 'react-moment';
import { AiOutlineUser, AiOutlineClockCircle } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import s from './MessageItem.module.scss';

const MessageItem = ({ message }) => {
    const { t } = useTranslation();

    if (!message || !message.author) {
        return <p className={s.errorMessage}>{t('messages.message_unavailable')}</p>;
    }

    console.log('Image URL:', message.imgUrl);

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
                <img 
                    src={`http://localhost:3001/${message.imgUrl}`} 
                    alt={t('messages.attached')} 
                    className={s.messageImage} 
                />
            )}
            <div className={s.timestampContainer}>
                <AiOutlineClockCircle className={s.icon} />
                <Moment date={message.createdAt} format="D MMM YYYY" className={s.timeStamp} />
            </div>
        </div>
    );
};

export default MessageItem;
