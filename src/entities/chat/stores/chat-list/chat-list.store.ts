import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { IChatListStore } from "./chat-list.interface";

export const useChatListStore = create<IChatListStore>()(
	devtools(
		immer((set, get) => ({
			chatList: [],
			setChatList: (chats) => set({ chatList: chats }, false, "chat-list/set-chats"),
			addChatToList: (chat) => {
				set(
					(state) => {
						state.chatList.push(chat);
					},
					false,
					"chat-list/add-chat"
				);
			},
			/** Sets chat in first place. */
			updateChatListRoughly: (payload) => {
				const chatIdx = get().chatList.findIndex(
					(chat) => chat.id === payload.chatId
				);
				if (chatIdx === -1) return;

				const updatedChat = { ...get().chatList[chatIdx], ...payload.newData };

				set(
					(state) => {
						state.chatList.splice(chatIdx, 1);
						state.chatList.unshift(updatedChat);
					},
					false,
					"chat-list/update-roughly"
				);
			},
			/** Doesn't changing order of chat in list. */
			updateChatListCarefully: (payload) => {
				const chatIdx = get().chatList.findIndex(
					(chat) => chat.id === payload.chatId
				);
				if (chatIdx === -1) return;

				const updatedChat = { ...get().chatList[chatIdx], ...payload.newData };

				set(
					(state) => {
						state.chatList[chatIdx] = updatedChat;
					},
					false,
					"chat-list/update-carefully"
				);
			}
		})),
		{
			name: "chat-list-store",
			enabled: import.meta.env.DEV,
			anonymousActionType: "unknown chat-list action 🦊"
		}
	)
);
