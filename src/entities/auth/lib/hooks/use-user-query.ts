import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { IUser } from "@/entities/user/interfaces";

import { API_SERVER_URL } from "@/shared/constants/environment";

import { getRequestHeaders } from "../helpers/get-request-headers";

const fetchUser = async () => {
	const response = await axios.get<IUser>(`${API_SERVER_URL}/auth/me`, {
		headers: getRequestHeaders()
	});
	return response;
};

export const useUserQuery = () => {
	return useQuery({
		queryKey: ["user"],
		queryFn: fetchUser,
		retry: false
	});
};
