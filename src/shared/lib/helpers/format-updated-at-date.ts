import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(isToday);
dayjs.extend(isSameOrAfter);

export const formatUpdatedAtDate = (date: Date) => {
	const nowDate = dayjs();
	const updatedDate = dayjs(date);

	// Если изменение было сегодня, отображаем время в формате "11:30 AM"
	if (updatedDate.isToday()) {
		return updatedDate.format("hh:mm A");
	}

	// Если изменение было на этой неделе, отображаем день недели в формате "Tue"
	if (updatedDate.isSameOrAfter(nowDate.startOf("week"))) {
		return updatedDate.format("ddd");
	}

	// Если изменение было раньше, отображаем дату в формате "Aug 21"
	return updatedDate.format("MMM D");
};
