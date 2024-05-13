import React from "react";

import { ICredentialsFormProps } from "./CredentialsForm.interface";
import { TextField, Button } from "@/shared/ui";

import styles from "../../styles/ContentForm.module.scss";

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
