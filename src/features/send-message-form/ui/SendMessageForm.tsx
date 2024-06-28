import React from "react";

import { TextField } from "@/shared/ui";

export const SendMessageForm: React.FC = () => {
	return (
		<div>
			<form>
				<TextField placeholder="You are beautiful ✨" />
			</form>
		</div>
	);
};
