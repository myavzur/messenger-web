import { FC } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { IContentTransitionProps } from "./ContentTransition.interface";
import styles from "./ContentTransition.module.scss";

export const ContentTransition: FC<IContentTransitionProps> = ({
	mountedContent,
	onContentEntered
}) => {
	return (
		<TransitionGroup className={styles.transition}>
			{mountedContent &&
				mountedContent.map((content) => (
					<CSSTransition
						key={content.id}
						timeout={300}
						unmountOnExit={true}
						mountOnEnter={true}
						classNames={styles[content.transitionName]}
						onEntered={() => onContentEntered(content)}
					>
						{content.element}
					</CSSTransition>
				))}
		</TransitionGroup>
	);
};
