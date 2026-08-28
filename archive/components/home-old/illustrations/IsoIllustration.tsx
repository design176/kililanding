import { matchSvg } from "./match-svg";
import { serveSvg } from "./serve-svg";
import { measureSvg } from "./measure-svg";

const SOURCES = {
  match: matchSvg,
  serve: serveSvg,
  measure: measureSvg,
} as const;

/**
 * Match / Serve / Measure isometric illustrations, inlined (not <img src>)
 * so their fills/strokes resolve the site's --color-* tokens and follow
 * light/dark mode instead of staying stuck at the light-theme colors
 * they were exported with.
 */
export function IsoIllustration({
  name,
  className,
}: {
  name: keyof typeof SOURCES;
  className?: string;
}) {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: SOURCES[name] }}
    />
  );
}
