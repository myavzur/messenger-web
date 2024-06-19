import { AuthLayout } from "@/layouts/auth-layout/ui";

import { RegisterForm } from "@/widgets/auth/register-form/ui";

const RegisterScreen = () => {
	return (
		<AuthLayout>
			<RegisterForm />
		</AuthLayout>
	);
};

export default RegisterScreen;
