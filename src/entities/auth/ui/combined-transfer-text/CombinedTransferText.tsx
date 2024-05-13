import React from "react";

import { ICombinedTransferTextProps } from "./CombinedTransferText.interface";
import { TextAnchor } from "@/shared/ui";
import styles from "./CombinedTransferText.module.scss";

export const CombinedTransferText: React.FC<ICombinedTransferTextProps> = ({
	mainText,
	transferText,
	transferPath
}) => {
	return (
		<p className={styles.transfer}>
			{mainText} &nbsp;
			<TextAnchor path={transferPath}>{transferText}</TextAnchor>
		</p>
	);
};