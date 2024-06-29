import { IMessage } from "../../interfaces";

export interface IMessageProps {
	message: IMessage;
	isOwn?: boolean;
	uiConfig?: {
		image: boolean;
		label: boolean;
	};
	onEmbeddedMessageClick?: (message: IMessage) => void;
}
