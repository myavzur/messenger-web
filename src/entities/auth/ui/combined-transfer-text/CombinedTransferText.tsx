import { FC } from "react";

import { TextAnchor } from "@/shared/ui";

import { ICombinedTransferTextProps } from "./CombinedTransferText.interface";
import styles from "./CombinedTransferText.module.scss";

export const CombinedTransferText: FC<ICombinedTransferTextProps> = ({
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
