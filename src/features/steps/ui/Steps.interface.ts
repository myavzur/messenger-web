import React from "react";

interface ITiming {
	delay?: number;
	duration: number;
}

export interface IStepConfig {
	forwardTiming?: ITiming;
	backwardTiming?: ITiming;
}

export interface IStepsProps {
	activeStepIndex: number;
	steps: React.ReactNode[];
	stepsConfig?: IStepConfig[];
}
