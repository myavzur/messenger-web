import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { ILoginBody } from "@/entities/auth/interfaces";
import { useLoginMutation } from "@/entities/auth/lib/hooks";
import { AuthFormLayout } from "@/entities/auth/ui/auth-form-layout";
import { CombinedTransferText } from "@/entities/auth/ui/combined-transfer-text";
import { Socials } from "@/entities/auth/ui/socials";

import { Button, Divider, TextAnchor, TextField } from "@/shared/ui";

export const LoginForm: React.FC = () => {
	const navigate = useNavigate();
	const loginMutation = useLoginMutation();

	const {
		register,
		handleSubmit,
		formState: { isValid }
	} = useForm<ILoginBody>({ mode: "onChange" });

	const handleLogin: SubmitHandler<ILoginBody> = async (credentials) => {
		if (!isValid) return;

		try {
			await loginMutation.mutateAsync(credentials);
			navigate("/messenger");
		} catch (error) {
			throw new Error("Network error");
		}
	};

	return (
		<AuthFormLayout
			as="form"
			onSubmit={handleSubmit(handleLogin)}
			footerElement={
				<>
					<Divider>or</Divider>
					<Socials />
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
