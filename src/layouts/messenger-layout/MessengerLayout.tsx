import React from "react";
import { Outlet } from "react-router-dom";

import { renderSidebarContent } from "@/widgets/sidebar/lib";

import styles from "./MessengerLayout.module.scss";

export const MessengerLayout: React.FC = () => {
	return (
		<div className={styles.layout}>
			<div className={styles.container}>
				<aside className={styles.sidebar}>{renderSidebarContent()}</aside>

				<main className={styles.main}>
					<Outlet />
				</main>
			</div>
		</div>
	);
};
