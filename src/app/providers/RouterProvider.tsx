import { FC, Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthLayout } from "@/layouts/auth-layout";
import { MessengerLayout } from "@/layouts/messenger-layout";

import { useAuthorizeQuery } from "@/entities/auth/lib/hooks";

import { PageLoader } from "@/shared/ui";

const LoginScreen = lazy(() => import("@/screens/auth/login"));
const RegisterScreen = lazy(() => import("@/screens/auth/register"));
const MessengerScreen = lazy(() => import("@/screens/messenger"));
const MessengerChatScreen = lazy(() => import("@/screens/messenger-chat"));

export const RouterProvider: FC = () => {
	const { isLoading, isSuccess } = useAuthorizeQuery();

	if (isLoading) {
		return <PageLoader captureText="Fetching Data..." />;
	}

	return (
		<BrowserRouter>
			<Suspense fallback={<PageLoader captureText="Loading Page..." />}>
				<Routes>
					<Route
						path="/"
						element={isSuccess ? <MessengerLayout /> : <Navigate to="/auth/login" />}
					>
						<Route
							index
							element={<MessengerScreen />}
						/>
						<Route
							path="c/:polymorphicId"
							element={<MessengerChatScreen />}
						/>
					</Route>

					<Route
						path="/auth"
						element={!isSuccess ? <AuthLayout /> : <Navigate to="/" />}
					>
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
						path="*"
						element={<Navigate to="/" />}
					/>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};
