import { usePreviousValue } from "../use-previous-value";

const updateLogStyle = "color: orange";

export const useWhyDidUpdate = (props: any, name = "props") => {
	const prevPropsRef = usePreviousValue(props);
	const prevProps = prevPropsRef.current;

	if (!prevProps) {
		console.log(`===== [useWhyDidUpdate: ${name}] Initial render =====`);
		return;
	}

	const prevKeys = Object.keys(prevProps);
	const keys = Object.keys(props);

	const allKeys = [...new Set(keys.concat(prevKeys))];
	let hasChanged = false;

	allKeys.forEach((key) => {
		if (props[key] !== prevProps[key]) {
			console.group(
				`%c===== [useWhyDidUpdate: ${name}] Update =====`,
				updateLogStyle
			);
			console.log(`%cProp has changed :>> ${key}`, updateLogStyle);
			console.log(`%cPrev value :>> ${prevProps[key]}`, updateLogStyle);
			console.log(`%cNew value :>> ${props[key]}`, updateLogStyle);
			console.groupEnd();

			hasChanged = true;
		}
	});

	if (!hasChanged) {
		console.log(`===== [useWhyDidUpdate: ${name}] Nothing has changed =====`);
	}
};
