import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { ILoginBody } from "@/entities/auth/interfaces";
import { useLoginMutation } from "@/entities/auth/lib/hooks";
import { AuthFormLayout } from "@/entities/auth/ui/auth-form-layout";
import { CombinedTransferText } from "@/entities/auth/ui/combined-transfer-text";

import { setAccessToken } from "@/shared/lib/helpers";
import {
	Button,
	Divider,
	Icon,
	SocialButton,
	TextAnchor,
	TextField
} from "@/shared/ui";

export const LoginForm: React.FC = () => {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { isValid }
	} = useForm<ILoginBody>({ mode: "onChange" });

	const loginMutation = useLoginMutation();

	const handleLogin: SubmitHandler<ILoginBody> = async (credentials) => {
		if (!isValid) return;
		try {
			const response = await loginMutation.mutateAsync(credentials);
			setAccessToken(response.data.access_token);
			navigate("/chats");
		} catch (error) {
			throw new Error("Network error");
		}
	};

	return (
		<AuthFormLayout
			onSubmit={handleSubmit(handleLogin)}
			footerElement={
				<>
					<Divider>or</Divider>

					<SocialButton leftIconElement={<Icon name="socials/google" />}>
						Continue with Google
					</SocialButton>

					<SocialButton leftIconElement={<Icon name="socials/facebook" />}>
						Continue with Facebook
					</SocialButton>

					<CombinedTransferText
						mainText="I didn't use WhisperFox earlier!"
						transferText="Register"
						transferPath="/auth/register"
					/>
				</>
			}
		>
			<legend>Glad to see You again!</legend>
			<TextField
				{...register("email", { required: true })}
				label="Email"
				type="email"
			/>
			<TextField
				{...register("password", { required: true })}
				label="Password"
				type="password"
			/>
			<TextAnchor
				path={"/auth/recovery"}
				isCentered={true}
			>
				I forgot my password 🦊
			</TextAnchor>
			<Button type="submit">Login</Button>
		</AuthFormLayout>
	);
};
