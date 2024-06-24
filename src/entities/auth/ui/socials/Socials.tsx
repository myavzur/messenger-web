import React from "react";

import { Icon, SocialButton } from "@/shared/ui";

export const Socials: React.FC = () => {
	const handleGoogleAuth = () => {
		console.log("Google");
	};

	return (
		<>
			<SocialButton
				onClick={handleGoogleAuth}
				leftIconElement={<Icon name="socials/google" />}
			>
				Continue with Google
			</SocialButton>
		</>
	);
};
