import { useLayoutEffect, useRef } from "react";

export const useLatestValue = <T>(value: T) => {
	const latestValueRef = useRef(value);

	useLayoutEffect(() => {
		latestValueRef.current = value;
	});

	return latestValueRef;
};
