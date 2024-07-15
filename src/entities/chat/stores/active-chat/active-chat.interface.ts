import { IChat, IMessage } from "../../interfaces";

export interface IState {
	chat: IChat | null;
	messages: IMessage[];
	replyFor: IMessage | null;
}

interface IActions {
	setChat: (chat: IChat) => void;
	setMessages: (messages: IMessage[]) => void;
	addMessage: (message: IMessage) => void;
	removeMessages: (payload: { messageIds: IMessage["id"][] }) => void;
	setReplyFor: (message: IMessage | null) => void;
}

export type IActiveChatStore = IState & IActions;
