export interface IIconProps {
	name: IIconName;
	className?: string;
	/** Применяет CSS трансформацию: rotate(180deg) */
	isMirrored?: boolean;
	width?: string;
	height?: string;
	onClick?: () => void;
}

export type IIconName =
	| "controls/attach"
	| "controls/close"
	| "controls/copy"
	| "controls/door-out"
	| "controls/edit"
	| "controls/folder-plus"
	| "controls/pin"
	| "controls/reply"
	| "controls/search-eye"
	| "controls/trash-bin"
	| "controls/user-gear"
	| "controls/user-ninja"
	| "file/file"
	| "file/image"
	| "socials/facebook"
	| "socials/google"
	| "ui/appendix"
	| "ui/arrow-right"
	| "ui/brush"
	| "ui/check"
	| "ui/eye"
	| "ui/eye-crossed"
	| "ui/menu-dots"
	| "ui/mention"
	| "ui/moon-stars"
	| "ui/phone"
	| "ui/verified";
