import React, { Suspense } from "react";
import {
	BrowserRouter,
	Navigate,
	NavigateFunction,
	Route,
	Routes,
	useNavigate
} from "react-router-dom";

// import { AuthLayout } from "@/layouts/auth-layout/ui";
// import { ChatsLayout } from "@/layouts/chats-layout/ui";

// import { useAuth } from "@/entities/user/lib/hooks";

// import { PageLoader } from "@/shared/ui";
// const Chats = React.lazy(() => import("@/screens/chats"));
// const Chat = React.lazy(() => import("@/screens/chat"));
const LoginScreen = React.lazy(() => import("@/screens/auth/login"));
const RegisterScreen = React.lazy(() => import("@/screens/auth/register"));

export const History: {
	navigate: (path: string) => void | NavigateFunction;
} = {
	navigate: () => {
		return;
	}
};

const NavigateSetter = () => {
	History.navigate = useNavigate();
	return null;
};

const ProtectedRoute: React.FC<{
	redirectPath: string;
	hasAccess: boolean;
	outlet: JSX.Element;
}> = ({ hasAccess, outlet, redirectPath }) => {
	return hasAccess ? outlet : <Navigate to={redirectPath} />;
};

/** Uses PageLoader for 2 cases.
 * * Fetching user data from server
 * * Loading lazy page
 */
export const AppRouterProvider: React.FC = () => {
	// const { isAuthorized, isCurrentUserFetching } = useAuth();

	// if (isCurrentUserFetching) {
	//   return <PageLoader isFullScreen={true} />;
	// }

	return (
		<BrowserRouter>
			<NavigateSetter />

			<Suspense fallback={<h1>Loading now...</h1>}>
				<Routes>
					<Route
						path="/chats"
						element={
							<ProtectedRoute
								redirectPath="/auth/login"
								hasAccess={false}
								outlet={<h1>Чаты</h1>}
							/>
						}
					>
						<Route
							index
							element={<h1>Чаты</h1>}
						/>
						<Route
							path=":polymorphicId"
							element={<h1>Чат</h1>}
						/>
					</Route>

					<Route path="/auth">
						<Route
							path="login"
							element={<LoginScreen />}
						/>
						<Route
							path="register"
							element={<RegisterScreen />}
						/>
					</Route>

					<Route
						index
						element={<Navigate to="/chats" />}
					/>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};
