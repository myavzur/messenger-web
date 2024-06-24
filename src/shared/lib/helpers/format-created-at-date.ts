import dayjs from "dayjs";

export const formatCreatedAtDate = (date: Date) => {
	return dayjs(date).format("hh:mm");
};
