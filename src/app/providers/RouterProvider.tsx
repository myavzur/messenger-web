import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useUserQuery } from "@/entities/auth/lib/hooks";

import { PageLoader } from "@/shared/ui";

const LoginScreen = React.lazy(() => import("@/screens/auth/login"));
const RegisterScreen = React.lazy(() => import("@/screens/auth/register"));
const MessengerScreen = React.lazy(() => import("@/screens/messenger"));

export const RouterProvider: React.FC = () => {
	const { isFetching, isSuccess } = useUserQuery();

	if (isFetching) {
		return <PageLoader captureText="Fetching Data..." />;
	}

	return (
		<BrowserRouter>
			<Suspense fallback={<PageLoader captureText="Loading Page..." />}>
				<Routes>
					<Route
						path="/messenger"
						element={!isSuccess && <Navigate to="/auth/login" />}
					>
						<Route
							index
							element={<MessengerScreen />}
						/>
					</Route>

					<Route
						path="/auth"
						element={isSuccess && <Navigate to="/messenger" />}
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
						element={<Navigate to="/messenger" />}
					/>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};
