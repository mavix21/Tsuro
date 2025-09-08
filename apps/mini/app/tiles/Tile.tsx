export function Tile({ x = 0, y = 0, size = 100 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 0 0 H 90 V 90 Z"
        fill="none"
        stroke="hotpink"
        strokeWidth={5}
      />
    </svg>
  );
}
