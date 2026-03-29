export default function calculateLevel(count: number) {
  let badgeLevel, badgeName;
  if (count < 5) {
    badgeLevel = 1;
    badgeName = "비기너 노마드";
  } else if (count < 15) {
    badgeLevel = 2;
    badgeName = "어드벤처 노마드";
  } else {
    badgeLevel = 3;
    badgeName = "마스터 노마드";
  }

  return { badgeLevel, badgeName };
}
