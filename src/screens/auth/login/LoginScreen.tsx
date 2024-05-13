import React from "react";

import { AuthLayout } from "@/layouts/auth-layout/ui";

import { LoginForm } from "@/widgets/auth/login-form/ui";

const LoginScreen: React.FC = () => {
	// const navigate = useNavigate();

	// const [login, loginStatus] = whisperFoxApi.useLoginMutation();
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
