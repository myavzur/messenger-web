import { useMutation } from "@tanstack/react-query";

import { QueryKey, queryClient } from "@/shared/api/query-client";

import authService from "../../services/auth.service";

export const useRegisterMutation = () => {
	return useMutation({
		mutationKey: [QueryKey.REGISTER],
		mutationFn: authService.register,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QueryKey.AUTHORIZE]
			});
		}
	});
};
