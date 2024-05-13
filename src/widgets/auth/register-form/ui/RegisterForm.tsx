import React, { useCallback, useMemo } from "react";
import { CSSTransition } from "react-transition-group";

import { useSteps } from "@/features/steps/lib/hooks";
import { Steps } from "@/features/steps/ui";

import { AuthFormLayout } from "@/entities/auth/ui/auth-form-layout";
import { CombinedTransferText } from "@/entities/auth/ui/combined-transfer-text";

import { Divider, Icon, SocialButton } from "@/shared/ui";

import styles from "../styles/ContentForm.module.scss";
import { IRegisterFormProps } from "./RegisterForm.interface";
import { CredentialsForm } from "./credentials-form";
import { PersonalizeForm } from "./personalize-form";

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
