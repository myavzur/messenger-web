import { FC } from "react";
import { CSSTransition } from "react-transition-group";

import { IRegisterCredentialsBody } from "@/entities/auth/interfaces";
import { AuthFormLayout } from "@/entities/auth/ui/auth-form-layout";
import { CombinedTransferText } from "@/entities/auth/ui/combined-transfer-text";
import { Socials } from "@/entities/auth/ui/socials";

import { Divider } from "@/shared/ui";

import styles from "../../styles/Form.module.scss";
import { CredentialsForm } from "../credentials-form";
import { IRegisterFormProps } from "./RegisterForm.interface";

export const RegisterForm: FC<IRegisterFormProps> = () => {
	const handleNewData = (
		data: IRegisterCredentialsBody | IRegisterCredentialsBody
	) => {
		console.log(data);
	};

	return (
		<AuthFormLayout
			footerElement={
				<CSSTransition
					in={true}
					timeout={300}
					classNames={{
						enter: styles.enter,
						enterActive: styles.enter_active,
						enterDone: styles.enter_done,
						exit: styles.exit,
						exitActive: styles.exit_active,
						exitDone: styles.exit_done
					}}
				>
					<div className={styles.footer}>
						<Divider>or</Divider>
						<Socials />
						<CombinedTransferText
							mainText="Already have an account?"
							transferText="Login"
							transferPath="/auth/login"
						/>
					</div>
				</CSSTransition>
			}
		>
			<CredentialsForm onSubmit={handleNewData} />
		</AuthFormLayout>
	);
};
