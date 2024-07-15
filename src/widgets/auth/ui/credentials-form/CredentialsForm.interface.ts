import { IRegisterCredentialsBody } from "@/entities/auth/interfaces";

export interface ICredentialsFormProps {
	onSubmit: (data: IRegisterCredentialsBody) => void;
}
