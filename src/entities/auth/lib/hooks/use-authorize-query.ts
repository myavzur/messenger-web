import { useQuery } from "@tanstack/react-query";

import { QueryKey } from "@/shared/api/query-client";

import authService from "../../services/auth.service";

export const useAuthorizeQuery = () => {
	return useQuery({
		queryKey: [QueryKey.AUTHORIZE],
		queryFn: authService.authorize,
		retry: false
	});
};
