import { IChat, IMessage } from "../interfaces";

interface IState {
	chat: IChat | null;
	messages: IMessage[];
	pinnedMessage: IMessage | null;
}

interface IActions {
	setChat: (chat: IChat) => void;
	setMessages: (messages: IMessage[]) => void;
	addMessages: (message: IMessage[]) => void;
	removeMessages: (payload: {
		chatId: IChat["id"];
		messageIds: IMessage["id"][];
	}) => void;
}

export type IActiveChatStore = IState & IActions;
