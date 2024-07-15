import { IContent, IMountedContent } from "../interfaces";

export interface IContentTransitionProps {
	mountedContent: IMountedContent;
	onContentEntered: (content: IContent) => void;
}
