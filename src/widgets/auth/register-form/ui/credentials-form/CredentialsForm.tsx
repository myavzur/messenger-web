import React from "react";

import { Button, TextField } from "@/shared/ui";

import styles from "../../styles/ContentForm.module.scss";
import { ICredentialsFormProps } from "./CredentialsForm.interface";

export const CredentialsForm: React.FC<ICredentialsFormProps> = ({ onSubmit }) => {
	return (
		<form
			onSubmit={onSubmit}
			className={styles["content-form"]}
		>
			<legend>Create new Account</legend>
			<TextField label="Email" />
			<TextField label="Password" />
			<Button type="submit">Next step</Button>
		</form>
	);
};
