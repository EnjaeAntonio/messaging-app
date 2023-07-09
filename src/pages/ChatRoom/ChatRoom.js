import React, { useState, useRef } from 'react';
import Message from '../../components/Message/Message';
import SignOut from '../../components/SignOut/SignOut';
import './ChatRoom.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faEllipsisV, faPhone, faBars, faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header/Header';
function ChatRoom({ firebase, firestore, useCollectionData, currentUser, auth }) {
	const messageRef = firestore.collection('messages');
	const query = messageRef.orderBy('createdAt').limit(25);

	const [messages] = useCollectionData(query, { idField: 'id' });
	const [formValue, setFormValue] = useState('');
	const dummy = useRef();

	const sendMessage = async (e) => {
		e.preventDefault();

		const { uid, photoURL } = auth.currentUser;
		await messageRef.add({
			text: formValue,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			uid,
			photoURL,
		});

		setFormValue('');

		dummy.current.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<section className="container message-container d-flex justify-content-center align-items-center">
			<div className="container-fluid message-card">
				<Header currentUser={currentUser} auth={auth} />
				<nav className="d-flex py-2 container-fluid border-bottom bg-light-subtle">
					<ul className="mb-0 p-0 w-75 ">
						<li className="nav-item">
							<FontAwesomeIcon icon={faBars} />
						</li>
					</ul>
					<ul className="mb-0 p-0 w-25 d-flex justify-content-end ">
						<li className="nav-item">
							<FontAwesomeIcon icon={faMagnifyingGlass} />
						</li>
						<li className="nav-item mx-2">
							<FontAwesomeIcon icon={faPhone} />
						</li>
						<li className="nav-item">
							<FontAwesomeIcon icon={faEllipsisV} />
						</li>
					</ul>
				</nav>
				<div className="chat-room py-3 bg-light-subtle container-fluid">
					<div className="messages">
						{messages &&
							messages.map((msg) => (
								<Message
									message={msg}
									key={msg.id}
									currentUser={currentUser}
									messageClass="text-black"
								/>
							))}
						<div ref={dummy}></div>
					</div>
					<form className="d-flex align-items-center" onSubmit={sendMessage}>
						<FontAwesomeIcon
							icon={faPaperclip}
							className="d-flex justify-content-center align-items-center px-2"
						/>
						<input
							value={formValue}
							onChange={(e) => setFormValue(e.target.value)}
							className="w-100"
						/>
						<button type="submit" className="btn btn-primary">
							<FontAwesomeIcon icon={faPaperPlane} />
						</button>
					</form>
				</div>
			</div>
		</section>
	);
}

export default ChatRoom;
