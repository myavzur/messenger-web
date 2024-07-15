import { ReactNode, useCallback, useState } from "react";

import { useEvent } from "@/shared/lib/hooks";

import { IContent, IMountedContent } from "../../interfaces";
import styles from "../styles/transitions.module.scss";

interface IUseContentSliderParams {
	initialContent: IContent;
}

export const useContentSlider = ({ initialContent }: IUseContentSliderParams) => {
	const [currentContent, setCurrentContent] = useState<IContent>(initialContent);

	const [mountedContent, setMountedContent] = useState<IMountedContent>([
		initialContent
	]);

	const onContentEntered = useEvent((content: IContent) => {
		if (content.id === currentContent.id) {
			setMountedContent([content]);
		}
	});

	const updateContent = useEvent(
		(id: string, element: ReactNode, isGoingForward: boolean) => {
			const newContent: IContent = {
				id,
				element,
				transitionName: isGoingForward
					? styles.transitionForward
					: styles.transitionBackward
			};

			setMountedContent([currentContent, newContent]);
			setCurrentContent(newContent);
		}
	);

	const updateContentForward = useCallback(
		(id: string, element: ReactNode) => {
			updateContent(id, element, true);
		},
		[updateContent]
	);

	const updateContentBackward = useCallback(
		(id: string, element: ReactNode) => {
			updateContent(id, element, false);
		},
		[updateContent]
	);

	return {
		mountedContent,
		onContentEntered,
		updateContentForward,
		updateContentBackward
	};
};
