import { MainLayout } from "@/layouts/main-layout";

import { ChatListSidebar } from "@/widgets/sidebar/chat-list-sidebar";

import styles from "./styles.module.scss";

const MessengerScreen = () => {
	return (
		<MainLayout>
			<div className={styles.sidebar}>
				<ChatListSidebar />
			</div>

			<div className={styles.chat}>
				<div className={styles.chatHeader}>Header</div>
				<div className={styles.chatContent}>Content</div>
			</div>

			<div className={styles.chatInfo}>
				<div>Chat</div>
				<div>Content</div>
			</div>
		</MainLayout>
	);
};

export default MessengerScreen;
