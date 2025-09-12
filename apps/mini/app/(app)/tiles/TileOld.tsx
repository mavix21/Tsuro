const STROKE_WIDTH = 5;

interface Point {
  x: number;
  y: number;
}
type PointPosition = "lb" | "lt" | "tl" | "tr" | "rt" | "rb" | "br" | "bl";
type Points = Record<PointPosition, Point>;

export function TileOld({
  size = 100,
  x = 0,
  y = 0,
  path1Fn,
  path2Fn,
  path3Fn,
  path4Fn,
}: {
  size?: number;
  x?: number;
  y?: number;
  path1Fn: (size: number, points: Points) => string;
  path2Fn: (size: number, points: Points) => string;
  path3Fn: (size: number, points: Points) => string;
  path4Fn: (size: number, points: Points) => string;
}) {
  const offset = size / 4;
  const points: Points = {
    lb: { x, y: y + size / 2 + offset },
    lt: { x, y: y + offset },
    tl: { x: x + offset, y },
    tr: { x: x + size / 2 + offset, y },
    rt: { x: x + size, y: y + offset },
    rb: { x: x + size, y: y + size / 2 + offset },
    br: { x: x + size / 2 + offset, y: y + size },
    bl: { x: x + offset, y: y + size },
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <rect
        x={x}
        y={y}
        width={size}
        height={size}
        fill="white"
        stroke="orangered"
        strokeWidth="2"
      /> */}
      <path
        d={path1Fn(size, points)}
        fill="none"
        stroke="hotpink"
        strokeWidth={STROKE_WIDTH}
      />
      <path
        d={path2Fn(size, points)}
        fill="none"
        stroke="hotpink"
        strokeWidth={STROKE_WIDTH}
      />
      <path
        d={path3Fn(size, points)}
        fill="none"
        stroke="hotpink"
        strokeWidth={STROKE_WIDTH}
      />
      <path
        d={path4Fn(size, points)}
        fill="none"
        stroke="hotpink"
        strokeWidth={STROKE_WIDTH}
      />
    </svg>
  );
}
