import React from "react";
import { Outlet } from "react-router-dom";

import { renderSidebarContent } from "@/widgets/sidebar/lib";

import styles from "./MessengerLayout.module.scss";

export const MessengerLayout: React.FC = () => {
	return (
		<div className={styles.layout}>
			<div className={styles.container}>
				<div className={styles.sidebar}>{renderSidebarContent()}</div>

				<div className={styles.main}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};
