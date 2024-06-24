import { useMutation } from "@tanstack/react-query";

import { QueryKey, queryClient } from "@/shared/api/query-client";
import { useWebsocket } from "@/shared/context/WebSocketContext/hooks/use-websocket";

import authService from "../../services/auth.service";

export const useLoginMutation = () => {
	const { openConnections } = useWebsocket();

	return useMutation({
		mutationKey: [QueryKey.LOGIN],
		mutationFn: authService.login,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QueryKey.AUTHORIZE]
			});
			openConnections();
		}
	});
};
