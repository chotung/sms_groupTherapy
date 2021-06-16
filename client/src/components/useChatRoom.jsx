import { useRef, useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const SOCKET_SERVER_URL = "http://localhost:1337";

export default function useChatRoom() {
	const [messages, setMessages] = useState([]);
	const socketRef = useRef();

	useEffect(() => {
		// create a new client with server url
		socketRef.current = socketIOClient(SOCKET_SERVER_URL);

		// listen for incoming message
		socketRef.current.on("new-message-event", (message) => {
			const incomingMessage = {
				...message,
				isOwner: message.senderId === socketRef.current.id,
			};
			setMessages((messages) => [...messages, incomingMessage]);
		});

		return () => {
			socketRef.current.disconnect();
		};
	}, []);
	const sendMessage = (messageBody) => {
		socketRef.current.emit("new-message-event", {
			body: messageBody,
			senderId: socketRef.current.id,
		});
	};
	return { messages, sendMessage };
}
