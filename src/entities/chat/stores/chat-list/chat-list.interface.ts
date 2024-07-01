import { IChat } from "../../interfaces";

interface IState {
	chatList: IChat[];
}

interface IActions {
	setChatList: (chats: IChat[]) => void;
	addChatToList: (chat: IChat) => void;
	updateChatListRoughly: (payload: {
		chatId: IChat["id"];
		newData: Partial<IChat>;
	}) => void;
	updateChatListCarefully: (payload: {
		chatId: IChat["id"];
		newData: Partial<IChat>;
	}) => void;
}

export type IChatListStore = IState & IActions;
