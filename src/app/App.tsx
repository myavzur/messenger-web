import {
	ReactQueryProvider,
	RouterProvider,
	SkeletonThemeProvider,
	SocketManager,
	ThemesProvider
} from "@/app/providers";
import "@/app/styles/main.scss";

export const App = () => {
	return (
		<ReactQueryProvider>
			<SocketManager />

			<ThemesProvider>
				<SkeletonThemeProvider>
					<RouterProvider />
				</SkeletonThemeProvider>
			</ThemesProvider>
		</ReactQueryProvider>
	);
};
