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

  if (value === null || value === undefined || value === "") {
    return undefined;
  }

  return String(value);
}

const ALLOWED_SORTS: ActivitySort[] = [
  "latest",
  "most_reviewed",
  "price_asc",
  "price_desc",
];

const ALLOWED_CATEGORIES: string[] = [
  "문화 · 예술",
  "관광",
  "식음료",
  "스포츠",
  "투어",
  "웰빙",
];

export function normalizeActivitiesParams(
  input: ActivitiesQueryInput,
): ActivitiesQueryParams {
  const rawCategory = readValue(input, "category");
  const category =
    rawCategory && ALLOWED_CATEGORIES.includes(rawCategory)
      ? rawCategory
      : undefined;

  const rawKeyword = readValue(input, "keyword")?.trim();
  const keyword =
    rawKeyword && rawKeyword.length > 0 ? rawKeyword.slice(0, 50) : undefined;

  const rawSort = readValue(input, "sort") as ActivitySort | undefined;
  const sort =
    rawSort && ALLOWED_SORTS.includes(rawSort) ? rawSort : DEFAULT_SORT;

  const rawPage = Number(readValue(input, "page"));
  const page = isNaN(rawPage) || rawPage < 1 ? DEFAULT_PAGE : rawPage;

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
