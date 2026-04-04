"use server";

import { revalidateTag } from "next/cache";
import { ACTIVITY_CACHE_TAGS } from "@/commons/consts/cacheTags";

const PURGE: { expire: number } = { expire: 0 };

export async function revalidateActivityListCache(): Promise<void> {
  revalidateTag(ACTIVITY_CACHE_TAGS.BEST, PURGE);
  revalidateTag(ACTIVITY_CACHE_TAGS.LATEST, PURGE);
  revalidateTag(ACTIVITY_CACHE_TAGS.LIST, PURGE);
}
