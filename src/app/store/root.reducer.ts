import { combineReducers } from "@reduxjs/toolkit";

import { userApi } from "@/entities/user/api";
import { settingsReducer } from "@/shared/models/settings";

export const rootReducer = combineReducers({
	[userApi.reducerPath]: userApi.reducer,
	settings: settingsReducer
});
