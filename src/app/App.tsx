import { ReactQueryProvider, RouterProvider, ThemesProvider } from "@/app/providers";
import "@/app/styles/main.scss";

import { WebSocketProvider } from "@/shared/context/websocket-context";

export const App = () => {
	return (
		<ReactQueryProvider>
			<ThemesProvider>
				<WebSocketProvider>
					<RouterProvider />
				</WebSocketProvider>
			</ThemesProvider>
		</ReactQueryProvider>
	);
};
