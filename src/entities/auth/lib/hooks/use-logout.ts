import { useWebsocket } from "@/shared/context/websocket-context/hooks/use-websocket";

import authService from "../../services/auth.service";

export const useLogout = () => {
	const { closeConnections } = useWebsocket();

	const logout = () => {
		authService.logout();
		closeConnections();
	};

	return logout;
};
