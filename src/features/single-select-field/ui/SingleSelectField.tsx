import React, { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

import { useClickOutside } from "@/shared/lib/hooks";
import { TextField } from "@/shared/ui";

import { ISingleSelectFieldProps } from "./SingleSelectField.interface";
import styles from "./SingleSelectField.module.scss";

export const SingleSelectField: React.FC<ISingleSelectFieldProps> = ({
	selectedValue,
	onValueSelected,
	options
}) => {
	const selectElementRef = useRef(null);
	const [isOptionsVisible, setIsOptionsVisible] = useState(false);

	useClickOutside(selectElementRef, () => setIsOptionsVisible(false));

	const handleSelectOption = (value: string) => {
		onValueSelected(value);
		setIsOptionsVisible(false);
	};

	return (
		<div
			className={styles.select}
			ref={selectElementRef}
			onClick={() => setIsOptionsVisible(true)}
		>
			<TextField
				label="Theme"
				value={selectedValue}
			/>

			<CSSTransition
				in={isOptionsVisible}
				timeout={300}
				mountOnEnter={true}
				unmountOnExit={true}
			>
				<ul className={styles.select__values}>
					{options.map((option) => (
						<li
							key={option.value}
							className={styles.select__value}
							onClick={() => handleSelectOption(option.value)}
						>
							{option.label}
						</li>
					))}
				</ul>
			</CSSTransition>
		</div>
	);
};
