import React from "react";

import { Button, ButtonGroup, Icon, TextField } from "@/shared/ui";

import styles from "../../styles/ContentForm.module.scss";
import { IPersonalizeFormProps } from "./PersonalizeForm.interface";

export const PersonalizeForm: React.FC<IPersonalizeFormProps> = ({
	onSubmit,
	onBack
}) => {
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
			<TextField label="Display Name" />

			<TextField label="Theme" />

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
