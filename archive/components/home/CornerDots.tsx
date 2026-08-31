import styles from "./CornerDots.module.css";

function hash(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const DOTS = Array.from({ length: 22 }, (_, i) => {
  const x = hash(i * 3 + 1) * 130 + 4;
  const y = hash(i * 3 + 2) * 48 + 4;
  const size = 1 + hash(i * 3 + 3) * 0.8;
  const opacity = 0.3 + hash(i * 7 + 1) * 0.5;
  return { x, y, size, opacity };
});

export function CornerDots({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 140 56"
      className={styles.dots}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      {DOTS.map((dot, i) => (
        <circle key={i} cx={dot.x} cy={dot.y} r={dot.size} fillOpacity={dot.opacity} />
      ))}
    </svg>
  );
}
