import { FC } from "react";

import { AuthLayout } from "@/layouts/auth-layout";

import { LoginForm } from "@/widgets/auth/login-form/ui";

const LoginScreen: FC = () => {
	return (
		<AuthLayout>
			<LoginForm />
		</AuthLayout>
	);
};

export default LoginScreen;
