import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Chat(props) {
	const { msg, name } = props;
	return (
		<ListGroup.Item className="d-flex justify-content-between mb-4 pb-3">
			<img
				src=""
				alt="avatar"
				className="avatar rounded-circle mr-2 ml-lg-3 ml-0 z-depth-1"
			/>
			<div className="chat-body white p-3 ml-2 z-depth-1">
				<div className="header">
					<strong className="primary-font">{name}</strong>
					<small className="pull-right text-muted">
						{/* <FontAwesomeIcon icon={["fas", "clock"]} /> */}
						{/* 12 minutes ago */}
					</small>
				</div>
				<hr className="w-100" />
				<p className="mb-0">{msg}</p>
			</div>
		</ListGroup.Item>
	);
}
