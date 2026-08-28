import { Sliders, Unite, Wallet } from "@phosphor-icons/react/dist/ssr";
import { cx } from "@/lib/cx";
import { ShowcaseFrame, ShowcasePoints, type ShowcasePoint } from "./Showcase";
import styles from "./PublisherShowcase.module.css";

const GRID_ROWS = [24, 52, 80, 108];
const GRID_COLS = [16, 44, 72, 100, 128, 156, 184, 212];

/** Each candle: [wickTop, wickBottom, bodyTop, bodyBottom] in the 0-140 viewBox. */
const CANDLES: [number, number, number, number][] = [
  [80, 112, 88, 105], [72, 108, 80, 100], [58, 96, 66, 88], [46, 82, 52, 74],
  [36, 70, 42, 62], [24, 56, 30, 48], [18, 46, 24, 38], [14, 40, 20, 34],
  [18, 46, 24, 40], [30, 60, 36, 52], [42, 74, 50, 66], [54, 86, 62, 78],
  [46, 78, 54, 70], [34, 66, 42, 58], [22, 52, 28, 44], [10, 36, 16, 28],
  [4, 28, 10, 22], [14, 40, 20, 34], [26, 56, 32, 48], [38, 68, 44, 60],
  [30, 60, 36, 52], [24, 54, 30, 46], [34, 64, 40, 56], [44, 74, 50, 66],
];

/** A handful of candles picked out in brand green among otherwise neutral bars. */
const GREEN_INDEXES = new Set([6, 16, 21]);

const CHART_WIDTH = 240;
const BAR_WIDTH = CHART_WIDTH / CANDLES.length;
const BODY_WIDTH = BAR_WIDTH * 0.55;

const POINTS: ShowcasePoint[] = [
  { icon: Sliders, label: "One SDK" },
  { icon: Unite, label: "Approve or block advertiser categories" },
  { icon: Wallet, label: "You keep 50% of advertiser spend" },
];

function candleClass(index: number) {
  if (GREEN_INDEXES.has(index)) return styles.candleBrand;
  return index % 2 === 0 ? styles.candleDark : styles.candleLight;
}

export function PublisherShowcase() {
  return (
    <ShowcaseFrame>
      <div className={styles.chartArea}>
        <svg
          viewBox={`0 0 ${CHART_WIDTH} 140`}
          className={styles.chartSvg}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g className={styles.grid}>
            {GRID_ROWS.map((y) =>
              GRID_COLS.map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r={1} />)
            )}
          </g>

          {CANDLES.map(([wickTop, wickBottom, bodyTop, bodyBottom], index) => {
            const x = index * BAR_WIDTH + BAR_WIDTH / 2;
            const color = candleClass(index);
            return (
              <g key={index}>
                <line x1={x} x2={x} y1={wickTop} y2={wickBottom} className={cx(styles.wick, color)} />
                <rect
                  x={x - BODY_WIDTH / 2}
                  y={bodyTop}
                  width={BODY_WIDTH}
                  height={Math.max(bodyBottom - bodyTop, 3)}
                  rx={BODY_WIDTH / 3}
                  className={color}
                />
              </g>
            );
          })}
        </svg>
      </div>

      <div className={styles.sliderRow}>
        <span className={styles.sliderLabel}>$</span>
        <div className={styles.sliderTrack}>
          <div className={styles.sliderFill} />
          <span className={styles.sliderHandle} />
        </div>
        <span className={styles.sliderLabel}>$$$</span>
      </div>

      <ShowcasePoints points={POINTS} />
    </ShowcaseFrame>
  );
}
