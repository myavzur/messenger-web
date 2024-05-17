import { useCallback, useLayoutEffect, useRef } from "react";

export const useEvent = <CallbackType extends (...args: any[]) => any>(
	callback: CallbackType
) => {
	const callbackRef = useRef(callback);

	useLayoutEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	const eventCallback = useCallback(
		(...args: Parameters<CallbackType>) => {
			return callbackRef.current.apply(null, args);
		},
		[callbackRef]
	);

	return eventCallback;
};
