import { useMutation } from "@tanstack/react-query";

import { QueryKey, queryClient } from "@/shared/api/query-client";
import { useWebsocket } from "@/shared/context/WebSocketContext/hooks/use-websocket";

import authService from "../../services/auth.service";

export const useRegisterMutation = () => {
	const { openConnections } = useWebsocket();

	return useMutation({
		mutationKey: [QueryKey.REGISTER],
		mutationFn: authService.register,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QueryKey.AUTHORIZE]
			});
			openConnections();
		}
	});
};
