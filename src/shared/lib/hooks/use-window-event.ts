import { useEffect } from "react";
import { useLatestValue } from "./use-latest-value";

type GetWindowEvent<EventName extends string> =
	EventName extends keyof WindowEventMap ? WindowEventMap[EventName] : Event;

export const useWindowEvent = <EventName extends string>(
	eventName: EventName,
	eventHandler: (event: GetWindowEvent<EventName>) => void
) => {
	const latestEventHandler = useLatestValue(eventHandler);

	useEffect(() => {
		const eventHandler = (event: any) => {
			latestEventHandler.current(event);
		};

		window.addEventListener(eventName, eventHandler);

		return () => window.removeEventListener(eventName, eventHandler);
	}, [eventName, latestEventHandler]);
};
