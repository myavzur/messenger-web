import axios from "axios";

import { getAccessToken } from "@/shared/lib/helpers";
import { useQuery } from "@tanstack/react-query";

const API_SERVER_URL = import.meta.env.VITE_API_SERVER_URL;

const fetchCurrentUser = async () => {
	return axios.get(`${API_SERVER_URL}/auth/me`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${getAccessToken()}`
		}
	});
};

export const useIsAuthorized = () => {
	return useQuery({
		queryKey: ["user"],
		queryFn: fetchCurrentUser
	});
};
