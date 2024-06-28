import { FC } from "react";

import { IMessageEmbeddedProps } from "./MessageEmbedded.interface";
import styles from "./MessageEmbedded.module.scss";

export const MessageEmbedded: FC<IMessageEmbeddedProps> = ({ message, onClick }) => {
	const highlightColor = message.user.theme;
	const stylesInline = {
		"--highlight-color": `var(--highlight-color-${highlightColor}, red)`,
		"--highlight-color-bg": `var(--highlight-color-${highlightColor}-bg, red)`
	} as React.CSSProperties;

	return (
		<div
			style={stylesInline}
			className={styles.message}
			onClick={() => onClick?.(message)}
		>
			<p className={styles.label}>{message.user.account_name}</p>
			<p className={styles.text}>{message.text}</p>
		</div>
	);
};
