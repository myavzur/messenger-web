import { AuthLayout } from "@/layouts/auth-layout/ui";

import { RegisterForm } from "@/widgets/auth/register-form/ui";

const RegisterScreen = () => {
	const handleRegister = () => {
		console.log("Register submit");
	};

	return (
		<AuthLayout>
			<RegisterForm onSubmit={handleRegister} />
		</AuthLayout>
	);
};

export default RegisterScreen;
