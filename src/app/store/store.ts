import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./root.reducer";

import { userApi } from "@/entities/user/api";

export const store = configureStore({
	devTools: import.meta.env.DEV,
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(userApi.middleware)
});

export type IStoreState = ReturnType<typeof store.getState>;
export type IStoreDispatch = typeof store.dispatch;
