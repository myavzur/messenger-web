import { useEffect, useRef } from "react";

export const useRenderWatcher = () => {
	const rendersRef = useRef<number>(0);

	useEffect(() => {
		rendersRef.current += 1;
	});

	return rendersRef;
};
