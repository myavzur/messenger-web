import { IRegisterPersonalizeBody } from "@/entities/auth/interfaces";

export interface IPersonalizeFormProps {
	onSubmit: (data: IRegisterPersonalizeBody) => void;
	onBack: () => void;
}
