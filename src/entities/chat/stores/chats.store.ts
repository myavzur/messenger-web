import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { IChatsStore } from "./chats.interface";

export const useChatsStore = create<IChatsStore>()(
	devtools(
		immer((set, get) => ({
			chats: [],
			setChats: (chats) => set({ chats }, false, "chats/set-chats"),
			addChat: (chat) => {
				set(
					(state) => {
						state.chats.push(chat);
					},
					false,
					"chats/add-chat"
				);
			},
			/** Sets chat in first place. */
			updateChatRoughly: (payload) => {
				const chatIdx = get().chats.findIndex((chat) => chat.id === payload.chatId);
				if (chatIdx === -1) return;

				const updatedChat = { ...get().chats[chatIdx], ...payload.newData };

				set(
					(state) => {
						state.chats.splice(chatIdx, 1);
						state.chats.unshift(updatedChat);
					},
					false,
					"chats/update-chat-roughly"
				);
			},
			/** Doesn't changing order of chat in list. */
			updateChatCarefully: (payload) => {
				const chatIdx = get().chats.findIndex((chat) => chat.id === payload.chatId);
				if (chatIdx === -1) return;

				const updatedChat = { ...get().chats[chatIdx], ...payload.newData };

				set(
					(state) => {
						state.chats[chatIdx] = updatedChat;
					},
					false,
					"chats/update-chat-carefully"
				);
			}
		})),
		{
			name: "chats-store",
			enabled: import.meta.env.DEV,
			anonymousActionType: "unknown chats action 🦊"
		}
	)
);
