export type ActivitySort =
  | "most_reviewed"
  | "price_asc"
  | "price_desc"
  | "latest";

export interface GetActivityListParams {
  method: "offset" | "cursor";
  cursorId?: number;
  category?: string;
  keyword?: string;
  sort?: ActivitySort;
  page?: number;
  size?: number;
}

export interface SubImage {
  id: number;
  imageUrl: string;
}

export interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface Activity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImages: SubImage[];
  schedules: Schedule[];
  reviewCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export type ActivityListItem = Pick<
  Activity,
  | "id"
  | "userId"
  | "title"
  | "description"
  | "category"
  | "price"
  | "address"
  | "bannerImageUrl"
  | "rating"
  | "reviewCount"
  | "createdAt"
  | "updatedAt"
>;

export interface ActivityListResponse {
  cursorId?: number | null;
  totalCount: number;
  activities: ActivityListItem[];
}

export interface ReviewUser {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

export interface Review {
  id: number;
  user: ReviewUser;
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Reviews {
  averageRating: number;
  totalCount: number;
  reviews: Review[];
}
