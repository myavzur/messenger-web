import React from "react";

import {
	Button,
	Divider,
	Icon,
	SocialButton,
	TextAnchor,
	TextField
} from "@/shared/ui";
import { AuthFormLayout } from "@/entities/auth/ui/auth-form-layout";
import { CombinedTransferText } from "@/entities/auth/ui/combined-transfer-text";
import { ILoginFormProps } from "./LoginForm.interface";

export const LoginForm: React.FC<ILoginFormProps> = ({ onSubmit }) => {
	return (
		<AuthFormLayout
			onSubmit={onSubmit}
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
			<TextField label="Email" />
			<TextField label="Password" />
			<TextAnchor
				path={"/auth/recovery"}
				isCentered={true}
			>
				I forgot my password 🦊
			</TextAnchor>
			<Button type="button">Login</Button>
		</AuthFormLayout>
	);
};
