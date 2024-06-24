import { useMutation } from "@tanstack/react-query";

import { QueryKey, queryClient } from "@/shared/api/query-client";

import authService from "../../services/auth.service";

export const useLoginMutation = () => {
	return useMutation({
		mutationKey: [QueryKey.LOGIN],
		mutationFn: authService.login,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QueryKey.AUTHORIZE]
			});
		}
	});
};
