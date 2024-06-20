import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { API_SERVER_URL } from "@/shared/constants/environment";
import { setAccessToken } from "@/shared/lib/helpers";

import { IAuthorizationResponse } from "../../interfaces";
import { getRequestHeaders } from "../helpers/get-request-headers";

const preformRegisterMutation = async () => {
	const response = await axios.get<IAuthorizationResponse>(
		`${API_SERVER_URL}/auth/register`,
		{
			headers: getRequestHeaders()
		}
	);

	setAccessToken(response.data.access_token);

	return response;
};

export const useRegisterMutation = () => {
	return useQuery({
		queryKey: ["register"],
		queryFn: preformRegisterMutation
	});
};
