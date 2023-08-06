import React from 'react';
import './Message.css';
function Message(props) {
    const { text, uid, photoURL, displayName, messageImage, createdAt } = props.message;

    const messageClass = uid === (props.currentUser && props.currentUser.uid) ? 'sent text-white' : 'bg-dark text-white received';
    return (
        <>
            <article className={`my-2 ${[messageClass]}`}>
                <div className="d-flex message-wrapper">
                    <img className="m-2 message-img rounded-circle" src={photoURL} />
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <h2 className="current-username mb-0">{displayName}</h2>
                        <p className="current-username mb-0">{createdAt?.toDate().toLocaleTimeString()}</p>
                    </div>
                </div>
                <p className="p-2">{text}</p>

                {messageImage && <img src={messageImage} alt="Message" className="w-25" />}
            </article>
        </>
    );
}

export default Message;