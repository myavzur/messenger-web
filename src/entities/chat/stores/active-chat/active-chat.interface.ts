import { IChat, IMessage } from "../../interfaces";

interface IState {
	activeChat: IChat | null;
	activeChatMessages: IMessage[];
	activeChatPinnedMessage: IMessage | null;
}

interface IActions {
	setActiveChat: (chat: IChat) => void;
	setActiveChatMessages: (messages: IMessage[]) => void;
	addActiveChatMessage: (message: IMessage) => void;
	removeActiveChatMessages: (payload: {
		chatId: IChat["id"];
		messageIds: IMessage["id"][];
	}) => void;
}

export type IActiveChatStore = IState & IActions;
