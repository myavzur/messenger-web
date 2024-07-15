export const copyToClipboard = async (value: any) => {
	let copiedString: string | null = null;

	await navigator.clipboard
		.writeText(value)
		.then(() => {
			copiedString = value;
		})
		.catch(() => {
			copiedString = null;
		});

	return copiedString;
};
