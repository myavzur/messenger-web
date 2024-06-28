import React from "react";
import { useParams } from "react-router-dom";

const MessengerChatScreen: React.FC = () => {
	const params = useParams<{ polymorphicId: string }>();

	return <pre>{JSON.stringify(params)}</pre>;
};

export default MessengerChatScreen;
