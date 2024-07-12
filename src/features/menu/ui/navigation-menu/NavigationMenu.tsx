import { FC } from "react";

import { useLogout } from "@/entities/auth/lib/hooks";

import { useClickOutside } from "@/shared/lib/hooks";
import { Icon, Menu, MenuItem } from "@/shared/ui";

import { INavigationMenuProps } from "./NavigationMenu.interface";

export const NavigationMenu: FC<INavigationMenuProps> = ({
	containerElementRef,
	onClose
}) => {
	const logout = useLogout();

	useClickOutside(containerElementRef, () => {
		onClose();
	});

	return (
		<Menu as="div">
			<MenuItem
				leftIconElement={<Icon name="controls/user-gear" />}
				onClick={() => alert("Show my profile")}
				aria-label="Show my profile"
			>
				Profile
			</MenuItem>

			<MenuItem
				leftIconElement={<Icon name="ui/brush" />}
				onClick={() => alert("Edit preferences")}
				aria-label="Edit preferences"
			>
				Preferences
			</MenuItem>

			<MenuItem
				isDangerous={true}
				leftIconElement={<Icon name="controls/door-out" />}
				onClick={logout}
				aria-label="Logout"
			>
				Logout
			</MenuItem>
		</Menu>
	);
};
