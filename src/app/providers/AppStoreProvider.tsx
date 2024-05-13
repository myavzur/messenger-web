import React from "react";
import { Provider } from "react-redux";

import { store } from "@/app/store";

interface IAppStoreProps {
	children?: React.ReactNode;
}

export const AppStoreProvider: React.FC<IAppStoreProps> = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};
