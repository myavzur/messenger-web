import { FC } from "react";
import { CSSTransition } from "react-transition-group";

import { Header } from "@/shared/ui";

import { IChatInfoSidebarProps } from "./ChatInfoSidebar.interface";
import styles from "./ChatInfoSidebar.module.scss";

export const ChatInfoSidebar: FC<IChatInfoSidebarProps> = ({ isOpen, onClose }) => {
	return (
		<CSSTransition
			in={isOpen}
			timeout={300}
			classNames={{
				enter: styles.sidebarEnter,
				enterActive: styles.sidebarEnter_active,
				enterDone: styles.sidebarEnter_done,
				exit: styles.sidebarExit,
				exitActive: styles.sidebarExit_active,
				exitDone: styles.sidebarExit_done
			}}
			mountOnEnter={true}
			unmountOnExit={true}
		>
			<div className={styles.sidebar}>
				<Header onClick={onClose}>Информация!</Header>
			</div>
		</CSSTransition>
	);
};
