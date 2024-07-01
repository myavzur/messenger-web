import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { IActiveChatStore } from "./active-chat.interface";

export const useActiveChatStore = create<IActiveChatStore>()(
	devtools(
		immer((set, get) => ({
			activeChat: null,
			activeChatMessages: [],
			activeChatPinnedMessage: null,
			setActiveChat: (chat) => {
				set(
					(state) => {
						state.activeChat = chat;
					},
					false,
					"active-chat/set-chat"
				);
			},
			setActiveChatMessages: (messages) => {
				set(
					(state) => {
						state.activeChatMessages = messages;
					},
					false,
					"active-chat/set-messages"
				);
			},
			addActiveChatMessage: (message) => {
				set(
					(state) => {
						state.activeChatMessages.unshift(message);
					},
					false,
					"active-chat/add-message"
				);
			},
			removeActiveChatMessages: (payload) => {
				const newMessages = get().activeChatMessages.filter(
					(message) => !payload.messageIds.includes(message.id)
				);

				set(
					(state) => {
						state.activeChatMessages = newMessages;
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
