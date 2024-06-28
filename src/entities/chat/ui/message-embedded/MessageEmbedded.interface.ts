import { IMessage } from "../../interfaces";

export interface IMessageEmbeddedProps {
	message: IMessage;
	onClick?: (message: IMessage) => void;
}
