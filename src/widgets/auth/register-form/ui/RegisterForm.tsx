import React, { useCallback, useMemo } from "react";

import { IRegisterFormProps } from "./RegisterForm.interface";
import { Divider, SocialButton, Icon } from "@/shared/ui";
import { CombinedTransferText } from "@/entities/auth/ui/combined-transfer-text";
import { AuthFormLayout } from "@/entities/auth/ui/auth-form-layout";
import { CredentialsForm } from "./credentials-form";
import { PersonalizeForm } from "./personalize-form";
import { Steps } from "@/features/steps/ui";
import { useSteps } from "@/features/steps/lib/hooks";
import { CSSTransition } from "react-transition-group";
import styles from "../styles/ContentForm.module.scss";

export const RegisterForm: React.FC<IRegisterFormProps> = () => {
	const { activeStepIndex, nextStep, previousStep, isFirstStep, isLastStep } =
		useSteps(2);

	const handleSupplyData = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			if (!isLastStep) {
				nextStep();
				return;
			}
		},
		[nextStep, isLastStep]
	);

	const steps = useMemo(() => {
		return [
			<CredentialsForm onSubmit={handleSupplyData} />,
			<PersonalizeForm
				onSubmit={handleSupplyData}
				onBack={previousStep}
			/>
		];
	}, [handleSupplyData, previousStep]);

	return (
		<AuthFormLayout
			footerElement={
				<CSSTransition
					in={isFirstStep}
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

						<SocialButton leftIconElement={<Icon name="socials/google" />}>
							Continue with Google
						</SocialButton>

						<SocialButton leftIconElement={<Icon name="socials/facebook" />}>
							Continue with Facebook
						</SocialButton>

						<CombinedTransferText
							mainText="Already have an account?"
							transferText="Login"
							transferPath="/auth/login"
						/>
					</div>
				</CSSTransition>
			}
		>
			<Steps
				activeStepIndex={activeStepIndex}
				steps={steps}
			/>
		</AuthFormLayout>
	);
};
