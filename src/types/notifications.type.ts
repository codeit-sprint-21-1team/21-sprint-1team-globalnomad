export interface NotificationItem {
  id: number;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface NotificationListResponse {
  cursorId: number | null;
  notifications: NotificationItem[];
  totalCount: number;
}
