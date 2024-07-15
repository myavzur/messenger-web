import { useCallback, useLayoutEffect, useRef } from "react";

/** Read more about this hook on:
 * https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md */
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
