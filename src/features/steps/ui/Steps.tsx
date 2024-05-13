import React, { useEffect, useMemo, useState } from "react";

import { IStepsProps } from "./Steps.interface";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { usePreviousValue } from "@/shared/lib/hooks";
import styles from "./Steps.module.scss";

export const Steps: React.FC<IStepsProps> = ({ steps, activeStepIndex }) => {
	const prevActiveStepIndexRef = usePreviousValue(activeStepIndex);
	const prevActiveStepIndex = prevActiveStepIndexRef.current;

	const [visibleStepIndexes, setVisibleStepIndexes] = useState(() => {
		return [activeStepIndex];
	});

	const isGoingForward = useMemo(() => {
		return (
			typeof prevActiveStepIndex === "number" &&
			prevActiveStepIndex < activeStepIndex
		);
	}, [activeStepIndex]);

	const enterClassSuffix = isGoingForward ? "from-right" : "from-left";
	const exitClassSuffix = isGoingForward ? "to-left" : "to-right";

	useEffect(() => {
		if (typeof prevActiveStepIndex !== "number") return;

		if (isGoingForward) {
			setVisibleStepIndexes([prevActiveStepIndex, activeStepIndex]);
		} else {
			setVisibleStepIndexes([activeStepIndex, prevActiveStepIndex]);
		}
	}, [activeStepIndex]);

	return (
		<TransitionGroup className={styles.steps}>
			{visibleStepIndexes.map((visibleStepIndex) => (
				<CSSTransition
					classNames={{
						enter: styles[`step_enter-${enterClassSuffix}`],
						enterActive: styles[`step_enter-${enterClassSuffix}-active`],
						enterDone: styles[`step_enter-${enterClassSuffix}-done`],
						exit: styles[`step_exit-${exitClassSuffix}`],
						exitActive: styles[`step_exit-${exitClassSuffix}-active`],
						exitDone: styles[`step_exit-${exitClassSuffix}-done`]
					}}
					key={visibleStepIndex}
					timeout={300}
					mountOnEnter={true}
					unmountOnExit={true}
					onEnter={() => {
						if (visibleStepIndexes.length <= 1) return;
						setVisibleStepIndexes([activeStepIndex]);
					}}
				>
					{steps[visibleStepIndex]}
				</CSSTransition>
			))}
		</TransitionGroup>
	);
};
