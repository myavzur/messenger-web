import { useEffect, useRef } from "react";

export const usePreviousValue = <T>(value: T) => {
	const previousValueRef = useRef<T | null>(null);

	useEffect(() => {
		previousValueRef.current = value;
	}, [value]);

	return previousValueRef;
};
