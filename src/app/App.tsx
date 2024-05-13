import {
	AppRouterProvider,
	AppStoreProvider,
	AppThemesProvider
} from "@/app/providers";
import "@/app/styles/main.scss";

// const CHAT_SERVER_URL = import.meta.env.VITE_CHAT_SERVER_URL;
// const PRESENCE_SERVER_URL = import.meta.env.VITE_PRESENCE_SERVER_URL;

export const App = () => {
	return (
		<AppStoreProvider>
			{/* <SocketsContextProvider
					chatServerUrl={CHAT_SERVER_URL}
					presenceServerUrl={PRESENCE_SERVER_URL}
				> */}
			<AppThemesProvider>
				<AppRouterProvider />
			</AppThemesProvider>
			{/* </SocketsContextProvider> */}
		</AppStoreProvider>
	);
};
