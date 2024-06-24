import { useWebsocket } from "@/shared/context/WebSocketContext/hooks/use-websocket";

import authService from "../../services/auth.service";

export const useLogout = () => {
	const { closeConnections } = useWebsocket();

	const logout = () => {
		authService.logout();
		closeConnections();
	};

	return logout;
};
