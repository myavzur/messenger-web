import { FC } from "react";

import { TextField } from "@/shared/ui";

export const SendMessageForm: FC = () => {
	return (
		<div>
			<form>
				<TextField placeholder="You are beautiful ✨" />
			</form>
		</div>
	);
};
