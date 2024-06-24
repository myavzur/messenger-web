import { MainLayout } from "@/layouts/main-layout";

import authService from "@/entities/auth/services/auth.service";

import { Button } from "@/shared/ui";

const MessengerScreen = () => {
	return (
		<MainLayout>
			<Button onClick={authService.logout}>Logout</Button>
			<div>1</div>
			<div className="div">1</div>
			<div className="div">2</div>
		</MainLayout>
	);
};

export default MessengerScreen;
