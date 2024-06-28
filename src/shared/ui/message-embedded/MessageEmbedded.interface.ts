import { IMessage } from "../../../entities/chat/interfaces";

export interface IMessageEmbeddedProps {
	message: IMessage;
	onClick?: (message: IMessage) => void;
}
