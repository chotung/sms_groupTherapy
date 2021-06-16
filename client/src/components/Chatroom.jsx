import { useParams } from "react-router-dom";
import Chat from "../components/Chat";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

const noTextMessages = 0;
const firstConvo = 0;

export default function Chatroom(props) {
	const { chat } = props;
	let { id } = useParams();

	const showSelectedChat = () => {
		const matchingConvo = chat.filter((convo) => {
			return convo.id === parseInt(id);
		});
		if (matchingConvo.length !== noTextMessages) {
			return matchingConvo[firstConvo].textM.map((message) => {
				console.log(message);
				return (
					<span key={message.id}>
						<Chat msg={message.msg} name={message.name} />
					</span>
				);
			});
		}
	};

	return (
		<Col>
			{showSelectedChat()}
			<ListGroup className="white">
				<Form>
					<Form.Control as="textarea" rows={3} className="pl-2 my-0" />
				</Form>
			</ListGroup>
			<Button className="btn-info btn-rounded btn-sm waves-effect waves-light float-right">
				Send
			</Button>
		</Col>
	);
}
