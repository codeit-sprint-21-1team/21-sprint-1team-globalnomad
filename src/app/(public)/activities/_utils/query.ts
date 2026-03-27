/**
 * URL 파라미터 고정 순서 (카테고리, 키워드, 정렬, 페이지)
 */
const PARAM_ORDER = ["category", "keyword", "sort", "page"] as const;
const DEFAULT_QUERY_VALUES = {
  page: "1",
  sort: "latest",
} as const;

type ParamKey = (typeof PARAM_ORDER)[number] | string;

export const updateQueryString = (
  current: URLSearchParams,
  updates: Record<ParamKey, string | number | null | undefined>,
): string => {
  const map = new Map<string, string>();

  current.forEach((value, key) => {
    map.set(key, value);
  });

  Object.entries(updates).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") {
      map.delete(key);
    } else {
      map.set(key, String(value));
    }
  });

  if (map.get("page") === DEFAULT_QUERY_VALUES.page) {
    map.delete("page");
  }

  if (map.get("sort") === DEFAULT_QUERY_VALUES.sort) {
    map.delete("sort");
  }

  const result = new URLSearchParams();

  PARAM_ORDER.forEach((key) => {
    if (map.has(key)) {
      result.set(key, map.get(key)!);
      map.delete(key);
    }
  });

  map.forEach((value, key) => {
    result.set(key, value);
  });

  return result.toString();
};
