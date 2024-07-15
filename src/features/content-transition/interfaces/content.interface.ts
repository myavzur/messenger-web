import { ReactNode } from "react";

export interface IContent {
	id: string;
	element: ReactNode;
	transitionName: string;
}

export type IMountedContent = [IContent] | [IContent, IContent];
