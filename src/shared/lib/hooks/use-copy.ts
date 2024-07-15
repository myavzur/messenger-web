import { useCallback, useState } from "react";

import { copyToClipboard } from "../helpers";

export default function useCopy(): [
	boolean,
	(str: string) => void,
	(isCopied: boolean) => void
] {
	const [isCopied, setIsCopied] = useState(false);

	const copy = useCallback(async (str: string) => {
		const copiedString = await copyToClipboard(str);
		setIsCopied(Boolean(copiedString));
	}, []);

	return [isCopied, copy, setIsCopied];
}
