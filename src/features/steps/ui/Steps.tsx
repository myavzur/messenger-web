import React, { useEffect, useMemo, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { usePreviousValue } from "@/shared/lib/hooks";

import { IStepsProps } from "./Steps.interface";
import styles from "./Steps.module.scss";

export const Steps: React.FC<IStepsProps> = ({ steps, activeStepIndex }) => {
	const prevActiveStepIndexRef = usePreviousValue(activeStepIndex);

	const [visibleStepIndexes, setVisibleStepIndexes] = useState(() => {
		return [activeStepIndex];
	});

	const isGoingForward = useMemo(() => {
		return (
			typeof prevActiveStepIndexRef.current === "number" &&
			prevActiveStepIndexRef.current < activeStepIndex
		);
	}, [prevActiveStepIndexRef, activeStepIndex]);

	const enterClassSuffix = isGoingForward ? "from-right" : "from-left";
	const exitClassSuffix = isGoingForward ? "to-left" : "to-right";

	useEffect(() => {
		if (typeof prevActiveStepIndexRef.current !== "number") return;

		if (isGoingForward) {
			setVisibleStepIndexes([prevActiveStepIndexRef.current, activeStepIndex]);
		} else {
			setVisibleStepIndexes([activeStepIndex, prevActiveStepIndexRef.current]);
		}
	}, [prevActiveStepIndexRef, isGoingForward, activeStepIndex]);

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
