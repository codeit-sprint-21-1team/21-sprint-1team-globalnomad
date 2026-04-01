export const formatPrice = (price: number) => {
  return price.toLocaleString("ko-KR");
};

export const checkIsPastDate = (dateStr: string): boolean => {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return dateStr < todayStr;
};
