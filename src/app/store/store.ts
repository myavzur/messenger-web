import { configureStore } from "@reduxjs/toolkit";

import { whisperFoxApi } from "@/shared/api";

import { rootReducer } from "./root.reducer";

export const store = configureStore({
	devTools: import.meta.env.DEV,
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(whisperFoxApi.middleware)
});

export type IStoreState = ReturnType<typeof store.getState>;
export type IStoreDispatch = typeof store.dispatch;
