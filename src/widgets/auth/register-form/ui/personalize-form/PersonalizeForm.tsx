import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { SingleSelectField } from "@/features/single-select-field/ui";

import { IRegisterPersonalizeBody } from "@/entities/auth/interfaces";
import { UserTheme, userThemeDictionary } from "@/entities/user/interfaces";

import { Button, ButtonGroup, Icon, TextField } from "@/shared/ui";

import styles from "../../styles/ContentForm.module.scss";
import { IPersonalizeFormProps } from "./PersonalizeForm.interface";

export const PersonalizeForm: FC<IPersonalizeFormProps> = ({ onSubmit, onBack }) => {
	const { handleSubmit, register, formState } = useForm<IRegisterPersonalizeBody>({
		mode: "onChange"
	});

	const [highlightColor, setHighlightColor] = useState(
		userThemeDictionary[UserTheme.SUNSET_ORANGE]
	);

	const handleSupplyData: SubmitHandler<IRegisterPersonalizeBody> = (data) => {
		if (!formState.isValid) return;
		onSubmit(data);
	};

	const handleSelectHighlightColor = (value: UserTheme) => {
		setHighlightColor(userThemeDictionary[value]);
	};

	return (
		<form
			onSubmit={handleSubmit(handleSupplyData)}
			className={styles.form}
		>
			<legend>Personalize your Experience ✨</legend>

			<div
				style={{
					height: 150,
					width: 150,
					backgroundColor: "orange",
					margin: "0 auto",
					borderRadius: 1500
				}}
			></div>

			<TextField
				label="Display Name"
				{...register("account_name")}
			/>

			<SingleSelectField
				selectedValue={highlightColor}
				onValueSelected={handleSelectHighlightColor}
				options={[
					{
						label: "Sunset Orange",
						value: UserTheme.SUNSET_ORANGE
					},
					{
						label: "Aqua Marine",
						value: UserTheme.AQUA_MARINE
					},
					{
						label: "Fresh Lime",
						value: UserTheme.FRESH_LIME
					}
				]}
			/>

			<ButtonGroup gridType="auto-1fr">
				<Button
					onClick={onBack}
					leftIconElement={
						<Icon
							name="arrow-right"
							isMirrored={true}
						/>
					}
				/>
				<Button type="submit">Join WhisperFox 🦊</Button>
			</ButtonGroup>
		</form>
	);
};
