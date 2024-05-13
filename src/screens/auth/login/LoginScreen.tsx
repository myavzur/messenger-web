import React from "react";

import { LoginForm } from "@/widgets/auth/login-form/ui";
import { AuthLayout } from "@/layouts/auth-layout/ui";

const LoginScreen: React.FC = () => {
	// const navigate = useNavigate();

	// const [login, loginStatus] = userApi.useLoginMutation();
	// const { updateSocketsAccessToken } = useSocketsContext();

	// const handleLogin = (credentials: ILoginBody) => {
	//   login(credentials)
	//     .unwrap()
	//     .then((data) => {
	//       updateSocketsAccessToken(data.access_token);
	//       navigate("/chats");
	//     });
	// };

	return (
		<AuthLayout>
			<LoginForm onSubmit={() => console.log("Login submit")} />
		</AuthLayout>
	);
};

export default LoginScreen;
