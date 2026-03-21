export function buildQueryString<T extends object>(params?: T): string {
  if (!params) return "";

  const searchParams = new URLSearchParams();

  const entries = Object.entries(params) as [
    string,
    string | number | boolean | null | undefined,
  ][];

  entries.forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}
