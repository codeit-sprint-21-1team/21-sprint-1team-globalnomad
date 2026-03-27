import type { ActivitySort } from "@/types/activities";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SORT: ActivitySort = "latest";

type ActivitiesQueryInput =
  | URLSearchParams
  | {
      category?: string | null;
      keyword?: string | null;
      sort?: ActivitySort | null;
      page?: string | number | null;
    };

export interface ActivitiesQueryParams {
  category?: string;
  keyword?: string;
  sort: ActivitySort;
  page: number;
  size: number;
}

function readValue(
  input: ActivitiesQueryInput,
  key: "category" | "keyword" | "sort" | "page",
): string | undefined {
  if (input instanceof URLSearchParams) {
    return input.get(key) ?? undefined;
  }

  const value = input[key];

  if (value === null || value === undefined) {
    return undefined;
  }

  return String(value);
}

export function normalizeActivitiesParams(
  input: ActivitiesQueryInput,
): ActivitiesQueryParams {
  const category = readValue(input, "category") || undefined;
  const keyword = readValue(input, "keyword") || undefined;
  const sort = (readValue(input, "sort") as ActivitySort | undefined) || DEFAULT_SORT;
  const page = Number(readValue(input, "page")) || DEFAULT_PAGE;

  return {
    category,
    keyword,
    sort,
    page,
    size: DEFAULT_PAGE_SIZE,
  };
}

export function createActivitiesQueryKey(params: ActivitiesQueryParams) {
  return [
    "activities",
    {
      category: params.category ?? null,
      keyword: params.keyword ?? null,
      sort: params.sort,
      page: params.page,
      size: params.size,
    },
  ] as const;
}
