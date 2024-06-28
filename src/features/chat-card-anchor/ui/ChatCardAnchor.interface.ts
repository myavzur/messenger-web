import { IChatCardProps } from "@/entities/chat/ui/chat-card";

export type IChatCardAnchorProps = Pick<IChatCardProps, "currentUserId" | "chat">;
