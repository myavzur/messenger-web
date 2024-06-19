import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useUserQuery } from "@/entities/auth/lib/hooks";

import { PageLoader } from "@/shared/ui";

import { ProtectedRoute } from "./ProtectedRoute";

const LoginScreen = React.lazy(() => import("@/screens/auth/login"));
const RegisterScreen = React.lazy(() => import("@/screens/auth/register"));

export const AppRouterProvider: React.FC = () => {
	const { isFetching, isSuccess } = useUserQuery();

	if (isFetching) {
		return <PageLoader captureText="Fetching Data..." />;
	}

	return (
		<BrowserRouter>
			<Suspense fallback={<PageLoader captureText="Loading Page..." />}>
				<Routes>
					<Route
						index
						element={<Navigate to="/chats" />}
					/>

					<Route
						path="/chats"
						element={
							<ProtectedRoute
								redirectPath="/auth/login"
								hasAccess={isSuccess}
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
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};
