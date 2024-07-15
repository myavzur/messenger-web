import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { IActiveChatStore, IState } from "./active-chat.interface";

const initialState: IState = {
	chat: null,
	messages: [],
	replyFor: null
};

export const useActiveChatStore = create<IActiveChatStore>()(
	devtools(
		immer((set, get) => ({
			...initialState,
			setChat: (chat) => {
				set(
					(state) => {
						state.chat = chat;
						state.messages = initialState["messages"];
						state.replyFor = initialState["replyFor"];
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
			addMessage: (message) => {
				set(
					(state) => {
						state.messages.unshift(message);
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
			},
			setReplyFor: (message) => {
				set(
					(state) => {
						state.replyFor = message;
					},
					false,
					"active-chat/set-reply-for"
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
