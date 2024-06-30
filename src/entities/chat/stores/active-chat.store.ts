import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { IActiveChatStore } from "./active-chat.interface";

export const useActiveChatStore = create<IActiveChatStore>()(
	devtools(
		immer((set, get) => ({
			chat: null,
			messages: [],
			pinnedMessage: null,
			setChat: (chat) => {
				set(
					(state) => {
						state.chat = chat;
					},
					false,
					"active-chat/set-chat"
				);
			},
			setMessages: (messages) => {
				set(
					(state) => {
						state.messages = messages;
					},
					false,
					"active-chat/set-messages"
				);
			},
			addMessages: (messages) => {
				set(
					(state) => {
						state.messages.push(...messages);
					},
					false,
					"active-chat/add-message"
				);
			},
			removeMessages: (payload) => {
				const newMessages = get().messages.filter(
					(message) => !payload.messageIds.includes(message.id)
				);

				set(
					(state) => {
						state.messages = newMessages;
					},
					false,
					"active-chat/remove-messages"
				);
			}
		})),
		{
			name: "active-chat-store",
			enabled: import.meta.env.DEV,
			anonymousActionType: "unknown active chat action 🦊"
		}
	)
);
