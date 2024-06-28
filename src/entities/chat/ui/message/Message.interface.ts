import { IMessage } from "../../interfaces";

export interface IMessageProps {
	message: IMessage;
	onContextMenu?: (payload: {
		message: IMessage;
		mousePosition: {
			x: number;
			y: number;
		};
	}) => void;
	onEmbeddedMessageClick?: (message: IMessage) => void;
	isOwn?: boolean;
	uiConfig?: {
		image: boolean;
		label: boolean;
	};
}
