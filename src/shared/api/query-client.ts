import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
});

export enum QueryKey {
	LOGIN = "login",
	REGISTER = "register",
	AUTHORIZE = "authorize_me",
	LOGOUT = "logout"
}
