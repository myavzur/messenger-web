import { ReactQueryProvider, RouterProvider, ThemesProvider } from "@/app/providers";
import "@/app/styles/main.scss";

export const App = () => {
	return (
		<ReactQueryProvider>
			<ThemesProvider>
				<RouterProvider />
			</ThemesProvider>
		</ReactQueryProvider>
	);
};
