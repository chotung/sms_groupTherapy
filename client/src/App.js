import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Conversation from "./components/Conversation";

const convos = [
	{
		id: 0,
		textM: [
			{
				name: "char",
				num: 19998886677,
				msg: "heeloo",
				timeStamp: "12:00",
			},
			{
				name: "twilio",
				num: 18880008888,
				msg: "It's me from twilio",
				timeStamp: "12:00",
			},
		],
	},
];

function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route path="/about">About</Route>
					<Route path="/convo/id">Convo ID</Route>
					<Route path="/">
						<h1>Dashboard</h1>
						{convos.map((convo) => {
							return (
								<Conversation id={convo.id} key={convo.id} msgs={convo.textM} />
							);
						})}
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
