import authService from "../../services/auth.service";

export const useLogout = () => authService.logout;
