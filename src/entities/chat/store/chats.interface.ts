import { IChat } from "../interfaces";

interface IState {
	chats: IChat[];
}

interface IActions {
	setChats: (chats: IChat[]) => void;
	addChat: (chat: IChat) => void;
	updateChatCarefully: (payload: {
		chatId: IChat["id"];
		newData: Partial<IChat>;
	}) => void;
	updateChatRoughly: (payload: {
		chatId: IChat["id"];
		newData: Partial<IChat>;
	}) => void;
}

export type IChatsStore = IState & IActions;
