import { useCallback, useState } from "react";

export const useSteps = (stepsLength: number) => {
	const [activeStepIndex, setActiveStepIndex] = useState(0);

	const nextStep = useCallback(() => {
		setActiveStepIndex((prevElementsIndex) => {
			if (prevElementsIndex >= stepsLength - 1) return prevElementsIndex;
			return prevElementsIndex + 1;
		});
	}, [stepsLength]);

	const previousStep = useCallback(() => {
		setActiveStepIndex((prevElementsIndex) => {
			if (prevElementsIndex <= 0) return prevElementsIndex;
			return prevElementsIndex - 1;
		});
	}, []);

	return {
		activeStepIndex,
		nextStep,
		previousStep,
		isLastStep: activeStepIndex === stepsLength - 1,
		isFirstStep: activeStepIndex === 0
	};
};
