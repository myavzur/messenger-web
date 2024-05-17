import React from "react";
import { useForm } from "react-hook-form";

import { IRegisterCredentialsBody } from "@/entities/auth/interfaces";

import { Button, TextField } from "@/shared/ui";

import styles from "../../styles/ContentForm.module.scss";
import { ICredentialsFormProps } from "./CredentialsForm.interface";

export const CredentialsForm: React.FC<ICredentialsFormProps> = ({ onSubmit }) => {
	const { register } = useForm<IRegisterCredentialsBody>({
		mode: "onChange"
	});

	return (
		<form
			onSubmit={onSubmit}
			className={styles["content-form"]}
		>
			<legend>Create new Account</legend>
			<TextField
				{...register("email")}
				label="Email"
			/>
			<TextField
				{...register("password")}
				label="Password"
			/>
			<Button type="submit">Next step</Button>
		</form>
	);
};
