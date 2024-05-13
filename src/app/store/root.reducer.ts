import { combineReducers } from "@reduxjs/toolkit";

import { whisperFoxApi } from "@/shared/api";
import { settingsReducer } from "@/shared/models/settings";

export const rootReducer = combineReducers({
	[whisperFoxApi.reducerPath]: whisperFoxApi.reducer,
	settings: settingsReducer
});
