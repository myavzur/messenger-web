import { useLayoutEffect, useRef } from "react";

export const useLatest = <T>(value: T) => {
	const latestValueRef = useRef(value);

	useLayoutEffect(() => {
		latestValueRef.current = value;
	});

	return latestValueRef;
};
