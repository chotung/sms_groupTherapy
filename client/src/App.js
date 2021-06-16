import "./App.css";
import { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Conversation from "./components/Conversation";
import Container from "react-bootstrap/Container";
// import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Chatroom from "./components/Chatroom";
import useChat from "./components/useChatRoom";
// save user in localstorage
function App() {
	const { messages, sendMessage } = useChat();
	const [newMessage, setNewMessage] = useState("");
	const messageRef = useRef();
	const convos = [
		{
			id: 0,
			textM: [
				{
					id: 0,
					name: "char",
					num: 19998886677,
					msg: "heeloo",
					timeStamp: "12:00",
				},
				{
					id: 1,
					name: "twilio",
					num: 18880008888,
					msg: "It's me from twilio",
					timeStamp: "12:01",
				},
			],
		},
		{
			id: 1,
			textM: [
				{
					id: 2,
					name: "char",
					num: 18198886631,
					msg: "New Person",
					timeStamp: "9:00",
				},
				{
					id: 3,
					name: "twilio",
					num: 13311008888,
					msg: "Twilio Message",
					timeStamp: "10:01",
				},
				{
					id: 4,
					name: "twilio",
					num: 13311008888,
					msg: "Twilio Message next one",
					timeStamp: "10:08",
				},
			],
		},
	];
	const [chat, setChat] = useState(convos);
	const [type, setType] = useState("");

	const handleNewMessageChange = (event) => {
		setNewMessage(event.target.value);
	};

	const handleSendMessage = () => {
		if (newMessage !== "") {
			sendMessage(newMessage);
			setNewMessage("");
		}
	};

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			if (newMessage !== "") {
				sendMessage(newMessage);
				setNewMessage("");
			}
		}
	};
	useEffect(() => messageRef.current.scrollIntoView({ behavior: "smooth" }));

	return (
		<div>
			<ol>
				{messages.map((message, i) => (
					<li key={i}>
						<span>{message.body}</span>
					</li>
				))}
			</ol>
			<div ref={messageRef}></div>
			<div>
				<input
					value={newMessage}
					onChange={handleNewMessageChange}
					onKeyUp={handleKeyUp}
				/>
				<button disabled={!newMessage} onClick={handleSendMessage}>
					Send
				</button>
			</div>
		</div>
		// <Router>
		// 	<div className="App">
		// 		<Navbar bg="dark" variant="dark">
		// 			<Container>
		// 				<Link to="/" className="navbar-brand m-auto">
		// 					Twilio Chat App
		// 				</Link>
		// 			</Container>
		// 		</Navbar>
		// 		<Switch>
		// 			<Route exact path="/convo/:id">
		// 				<Container>
		// 					<Row>
		// 						{/* <Col>
		// 							{chat.map((convo) => {
		// 								return (
		// 									<Conversation
		// 										id={convo.id}
		// 										key={convo.id}
		// 										msgs={convo.textM[convo.textM.length - 1]}
		// 									/>
		// 								);
		// 							})}
		// 						</Col> */}
		// 						<Chatroom chat={chat} />
		// 					</Row>
		// 				</Container>
		// 			</Route>
		// 			<Route path="/">
		// 				<Container>
		// 					<h1>Dashboard</h1>
		// 					{chat.map((convo) => {
		// 						return (
		// 							<Conversation
		// 								id={convo.id}
		// 								key={convo.id}
		// 								msgs={convo.textM[convo.textM.length - 1]}
		// 							/>
		// 						);
		// 					})}
		// 				</Container>
		// 			</Route>
		// 		</Switch>
		// 	</div>
		// </Router>
	);
}

export default App;
