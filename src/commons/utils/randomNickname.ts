export const generateRandomNickname = (): string => {
  const adjectives = [
    "갓생사는",
    "갓기",
    "안광없는",
    "맑눈광",
    "은은하게미친",
    "자본주의",
    "킹받는",
    "무소유",
    "월요병",
    "재택하는",
    "탕진하는",
    "기개있는",
    "폼미친",
    "우아하게",
    "조용히강한",
    "확신의",
    "고독한",
    "집착광공",
    "맑은정신",
    "네모난",
  ];
  const animals = [
    "쿼카",
    "판다",
    "다람쥐",
    "햄스터",
    "수달",
    "너구리",
    "코알라",
    "뱁새",
    "친칠라",
    "미어캣",
    "나무늘보",
    "알파카",
    "카피바라",
    "해파리",
    "물개",
    "하마",
    "거북이",
    "두더지",
    "올빼미",
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];

  const randomNumber = Math.floor(Math.random() * 9000) + 1000;

  return `${randomAdjective}${randomAnimal}${randomNumber}`;
};
