import {
	AppReactQueryProvider,
	AppRouterProvider,
	AppThemesProvider
} from "@/app/providers";
import "@/app/styles/main.scss";

export const App = () => {
	return (
		<AppReactQueryProvider>
			<AppThemesProvider>
				<AppRouterProvider />
			</AppThemesProvider>
		</AppReactQueryProvider>
	);
};
