import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { IChatsStore } from "./chats.interface";

export const useChatsStore = create<IChatsStore>()(
	immer((set, get) => ({
		chats: [],
		setChats: (chats) => set({ chats }),
		addChat: (chat) => {
			set((state) => {
				state.chats.push(chat);
			});
		},
		/** Sets chat in first place. */
		updateChatRoughly: (payload) => {
			const chatIdx = get().chats.findIndex((chat) => chat.id === payload.chatId);
			if (chatIdx === -1) return;

			const updatedChat = { ...get().chats[chatIdx], ...payload.newData };

			set((state) => {
				state.chats.splice(chatIdx, 1);
				state.chats.unshift(updatedChat);
			});
		},
		/** Doesn't changing order of chat in list. */
		updateChatCarefully: (payload) => {
			const chatIdx = get().chats.findIndex((chat) => chat.id === payload.chatId);
			if (chatIdx === -1) return;

			const updatedChat = { ...get().chats[chatIdx], ...payload.newData };

			set((state) => {
				state.chats[chatIdx] = updatedChat;
			});
		}
	}))
);
