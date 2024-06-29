import { ReactQueryProvider, RouterProvider, ThemesProvider } from "@/app/providers";
import "@/app/styles/main.scss";

import { WebSocketProvider } from "@/shared/context/websocket-context";

import { SkeletonThemeProvider } from "./providers/SkeletonThemeProvider";

export const App = () => {
	return (
		<ReactQueryProvider>
			<WebSocketProvider>
				<ThemesProvider>
					<SkeletonThemeProvider>
						<RouterProvider />
					</SkeletonThemeProvider>
				</ThemesProvider>
			</WebSocketProvider>
		</ReactQueryProvider>
	);
};
