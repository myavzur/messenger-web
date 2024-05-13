import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";

const LoginScreen = React.lazy(() => import("@/screens/auth/login"));
const RegisterScreen = React.lazy(() => import("@/screens/auth/register"));

export const AppRouterProvider: React.FC = () => {
	// const { isAuthorized, isCurrentUserFetching } = useAuth();

	// if (isCurrentUserFetching) {
	//   return <PageLoader isFullScreen={true} />;
	// }

	return (
		<BrowserRouter>
			<Suspense fallback={<h1>Loading now...</h1>}>
				<Routes>
					<Route
						path="/chats"
						element={
							<ProtectedRoute
								redirectPath="/auth/login"
								hasAccess={false}
								element={<h1>Чаты</h1>}
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
