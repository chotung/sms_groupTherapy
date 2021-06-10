import React from "react";
import { useHistory } from "react-router-dom";

export default function Conversation(props) {
	let history = useHistory();

	const handleClick = () => {
		console.log("clicking");
		history.push("/convo/id");
	};

	const renderMessages = () => {
		return props.msgs.map((msge) => {
			return (
				<p key={msge.num}>
					{msge.num}
					&nbsp;
					{msge.name}: &nbsp;
					{msge.msg}
				</p>
			);
		});
	};
	return (
		<div onClick={handleClick}>
			<h2>The phone #</h2>
			{renderMessages()}
		</div>
	);
}
