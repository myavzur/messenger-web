import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { SingleSelectField } from "@/features/single-select-field/ui";

import { IRegisterPersonalizeBody } from "@/entities/auth/interfaces";
import { UserTheme, userThemeDictionary } from "@/entities/user/interfaces";

import { Button, ButtonGroup, Icon, TextField } from "@/shared/ui";

import styles from "../../styles/ContentForm.module.scss";
import { IPersonalizeFormProps } from "./PersonalizeForm.interface";

export const PersonalizeForm: React.FC<IPersonalizeFormProps> = ({
	onSubmit,
	onBack
}) => {
	const { register } = useForm<IRegisterPersonalizeBody>({
		mode: "onChange"
	});

	const [preferredHighlightColor, setPreferredHighlightColor] = useState(
		userThemeDictionary[UserTheme.SUNSET_ORANGE]
	);

	const handleSelectPreferredHighlightColor = (value: UserTheme) => {
		setPreferredHighlightColor(userThemeDictionary[value]);
	};

	return (
		<form
			onSubmit={onSubmit}
			className={styles["content-form"]}
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
				selectedValue={preferredHighlightColor}
				onValueSelected={handleSelectPreferredHighlightColor}
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
