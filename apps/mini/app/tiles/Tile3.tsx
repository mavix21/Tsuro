const STROKE_WIDTH = 5;

export function Tile3({
  size = 100,
  x = 0,
  y = 0,
  path1Fn,
  path2,
  path3,
  path4,
}: {
  size?: number;
  x?: number;
  y?: number;
  path1Fn: (size: number) => string;
  path2: string;
  path3: string;
  path4: string;
}) {
  const points = [
    [x + size / 2, y],
    [x + size, y + size / 2],
    [x + size / 2, y + size],
    [x, y + size / 2],
  ];
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x={x}
        y={y}
        width={size}
        height={size}
        fill="white"
        stroke="orangered"
        strokeWidth="2"
      />
      <path
        d={path1Fn(size)}
        fill="none"
        stroke="hotpink"
        strokeWidth={STROKE_WIDTH}
      />
      <path d={path2} fill="none" stroke="hotpink" strokeWidth={STROKE_WIDTH} />
      <path d={path3} fill="none" stroke="hotpink" strokeWidth={STROKE_WIDTH} />
      <path d={path4} fill="none" stroke="hotpink" strokeWidth={STROKE_WIDTH} />
    </svg>
  );
}
