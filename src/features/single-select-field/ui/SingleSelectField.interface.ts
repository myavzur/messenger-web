export interface ISingleSelectOption {
	label: string;
	value: string;
	color?: string;
}

export interface ISingleSelectFieldProps {
	selectedValue: ISingleSelectOption["value"];
	onValueSelected: (value: any) => void;
	options: ISingleSelectOption[];
}
