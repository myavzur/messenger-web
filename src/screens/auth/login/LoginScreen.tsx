import React from "react";

import { AuthLayout } from "@/layouts/auth-layout/ui";

import { LoginForm } from "@/widgets/auth/login-form/ui";

const LoginScreen: React.FC = () => {
	return (
		<AuthLayout>
			<LoginForm />
		</AuthLayout>
	);
};

export default LoginScreen;
