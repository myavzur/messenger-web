import React from "react";

export interface IAuthFormLayoutProps {
	onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
	children?: React.ReactNode;
	footerElement?: React.ReactNode;
}
