export type CloudConfig = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
  color?: string;
  parallaxFactor: number;
};

export const CLOUDS: CloudConfig[] = [
  // 가까운 구름 (y: -1 ~ 0) — 순백
  { position: [-2, -1, -5],   rotation: [0.05,  0.3,  0], scale: 1.9, speed: 0.4,  parallaxFactor: 1.5, color: "#ffffff" },
  { position: [-15, -1, -1],  rotation: [-0.05, 3.1,  0], scale: 1.1, speed: 0.65, parallaxFactor: 1.5, color: "#ffffff" },
  { position: [7, 0, -3],     rotation: [0.1,  -0.4,  0], scale: 1,   speed: 0.75, parallaxFactor: 1.5, color: "#ffffff" },
  { position: [15, -1, -1],   rotation: [0.0,   2.5,  0], scale: 1,   speed: 0.65, parallaxFactor: 1.5, color: "#ffffff" },

  // 중간 구름 (y: 2.5 ~ 5) — 하늘빛 살짝
  { position: [-15, 3, 0],    rotation: [0.05,  0.8,  0], scale: 0.5,  speed: 0.45, parallaxFactor: 1.0, color: "#ddeeff" },
  { position: [-11, 5, -6],   rotation: [0.2,   1.0,  0], scale: 0.8,  speed: 0.5,  parallaxFactor: 0.8, color: "#ddeeff" },
  { position: [15, 2.5, 0],   rotation: [0.08, -0.6,  0], scale: 0.5,  speed: 0.45, parallaxFactor: 1.0, color: "#ddeeff" },
  { position: [8, 4, -2],     rotation: [3.0,   6.0,  0], scale: 0.6,  speed: 0.75, parallaxFactor: 0.8, color: "#ddeeff" },
  { position: [1, 6, -3],     rotation: [-0.05, 3.5,  0], scale: 0.5,  speed: 0.75, parallaxFactor: 0.8, color: "#ddeeff" },

  // 먼 구름 (y: 7 ~ 12) — 하늘에 묻히는 느낌
  { position: [-4, 6.5, -2],  rotation: [0.1,   0.2,  0], scale: 0.4,  speed: 0.75, parallaxFactor: 0.35, color: "#c8dff5" },
  { position: [23, 11, -15],  rotation: [0.0,   2.8,  0], scale: 0.65, speed: 0.55, parallaxFactor: 0.45, color: "#c8dff5" },
  { position: [-26, 12, -15], rotation: [-0.08, 0.5,  0], scale: 0.7,  speed: 0.55, parallaxFactor: 0.25, color: "#c8dff5" },
];
