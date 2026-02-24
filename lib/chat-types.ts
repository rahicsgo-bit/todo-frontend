export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string; // "user" for current user, or team member id
  text: string;
  timestamp: Date;
}

export interface ChatConversation {
  id: string;
  memberId: string;
  memberName: string;
  memberColor: string;
  messages: ChatMessage[];
  unreadCount: number;
}
