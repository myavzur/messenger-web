import { IStepConfig } from "../../ui/Steps.interface";

export const getStepConfig = (isGoingForward: boolean, stepConfig?: IStepConfig) => {
	let timeout = 300;
	let inlineStyles: React.CSSProperties = {};

	if (!stepConfig) {
		return { timeout, inlineStyles };
	}

	const timingConfig =
		stepConfig[isGoingForward ? "forwardTiming" : "backwardTiming"];

	const timingDelay = (timingConfig && timingConfig.delay) || 0;
	const timingDuration = (timingConfig && timingConfig.duration) || 0;

	timeout = timingDelay + timingDuration;
	inlineStyles = {
		"--step-change-delay": timingDelay + "ms"
	} as React.CSSProperties;

	return { timeout, inlineStyles };
};
