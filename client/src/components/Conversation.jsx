import React from "react";
import { useHistory } from "react-router-dom";
import Chatroom from "../components/Chatroom";
import Chat from "../components/Chat";
import ListGroup from "react-bootstrap/ListGroup";

export default function Conversation(props) {
	let history = useHistory();

	const handleClick = () => {
		history.push(`/convo/${props.id}`);
	};

	const renderMessages = () => {
		return (
			<ListGroup key={props.msgs.id}>
				<ListGroup.Item>
					{/* Make sure you the conversation header isn't yourself */}
					<h2>{props.msgs.name ? props.msgs.name : props.msgs.number}</h2>
					<p>{props.msgs.msg}</p>
				</ListGroup.Item>
			</ListGroup>
		);
	};
	return <div onClick={handleClick}>{renderMessages()}</div>;
}
