import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineSend } from 'react-icons/ai';
import axios from '../../utils/axios';
import s from './DialogPage.module.scss';
import { ThemeContext } from '../../components/ThemeContext/ThemeContext';
import { BsFillXOctagonFill, BsImage } from 'react-icons/bs';
import MessageItem from '../../components/MessageItem/MessageItem';
import { useTranslation } from 'react-i18next'; 

const DialogPage = () => {
    const { id: dialogId } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { theme } = useContext(ThemeContext);
    const [image, setImage] = useState(null);
    const { t } = useTranslation(); 

    const fetchMessages = async () => {
        if (!dialogId) return console.error('dialogId is undefined');

        try {
            const response = await axios.get(`/messages/${dialogId}`);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [dialogId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!dialogId || !message.trim()) return console.error("dialogId is undefined or message is empty");

        const formData = new FormData();
        formData.append("message", message);
        formData.append("dialogId", dialogId);
        if (image) formData.append("image", image);

        try {
            const response = await axios.post(`/messages/${dialogId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage('');
            setImage(null);
            fetchMessages();
        } catch (error) {
            console.error(error);
        }
    };

    const detachImageHandler = () => {
        setImage(null);
    };

    return (
        <div className={`${s.dialogPage} ${theme === 'dark' ? s.dark : s.light}`}>
            <div className={`${s.messagesContainer} ${theme === 'dark' ? s.dark : s.light}`}>
                {messages.map((msg) => (
                    <MessageItem key={msg._id} message={msg} />
                ))}
            </div>
            <form onSubmit={handleSubmit} className={`${s.inputForm} ${theme === 'dark' ? s.dark : s.light}`}>
                <label className={s.fileInputLabel}>
                    <BsImage className={s.icon} />
                    <input
                        type="file"
                        className={s.fileInput}
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </label>

                {image && (
                    <div className={s.imageWrapper}>
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            className={s.imagePreview}
                        />
                        <button type="button" className={s.detachButton} onClick={detachImageHandler}>
                            <BsFillXOctagonFill />
                        </button>
                    </div>
                )}

                <input 
                    type="text" 
                    value={message} 
                    onChange={e => setMessage(e.target.value)} 
                    placeholder={t('messages.enter_message')} 
                    className={`${s.inputField} ${theme === 'dark' ? s.dark : s.light}`}
                />
                <button type="submit" className={`${s.sendButton} ${theme === 'dark' ? s.dark : s.light}`}>
                    <AiOutlineSend className={s.sendIcon} />
                </button>
            </form>
        </div>
    );
};

export default DialogPage;
