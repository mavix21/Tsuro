export function Tile2({
  size = 100,
  x = 0,
  y = 0,
  path1,
  path2,
}: {
  size?: number;
  x?: number;
  y?: number;
  path1: string;
  path2: string;
}) {
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
      <path d={path1} fill="none" stroke="hotpink" strokeWidth={5} />
      <path d={path2} fill="none" stroke="hotpink" strokeWidth={5} />
      <circle
        cx={0}
        cy={0}
        r={size / 4}
        fill="none"
        stroke="hotpink"
        strokeWidth={5}
      />
      <circle
        cx={size}
        cy={0}
        r={size / 4}
        fill="none"
        stroke="hotpink"
        strokeWidth={5}
      />
    </svg>
  );
}
