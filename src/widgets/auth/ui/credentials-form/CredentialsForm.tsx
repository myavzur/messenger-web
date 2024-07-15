import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { IRegisterCredentialsBody } from "@/entities/auth/interfaces";

import { Button, TextField } from "@/shared/ui";

import styles from "../../styles/Form.module.scss";
import { ICredentialsFormProps } from "./CredentialsForm.interface";

export const CredentialsForm: FC<ICredentialsFormProps> = ({ onSubmit }) => {
	const { handleSubmit, register, formState } = useForm<IRegisterCredentialsBody>({
		mode: "onChange"
	});

	const handleSupplyData: SubmitHandler<IRegisterCredentialsBody> = (data) => {
		if (!formState.isValid) return;
		onSubmit(data);
	};

	return (
		<form
			onSubmit={handleSubmit(handleSupplyData)}
			className={styles.form}
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
