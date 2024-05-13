import { Navigate } from "react-router-dom";

interface IProtectedRouteProps {
	redirectPath: string;
	hasAccess: boolean;
	element: JSX.Element;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
	hasAccess,
	element,
	redirectPath
}) => {
	return hasAccess ? element : <Navigate to={redirectPath} />;
};
