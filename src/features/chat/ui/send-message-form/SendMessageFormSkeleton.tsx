import { FC } from "react";
import Skeleton from "react-loading-skeleton";

export const SendMessageFormSkeleton: FC = () => {
	return (
		<div>
			<form>
				<Skeleton />
			</form>
		</div>
	);
};
