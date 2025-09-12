interface AnimatedTokenProps {
  pathData: string;
  size?: number;
  duration?: number;
}

export function AnimatedToken({
  pathData,
  size = 8,
  duration = 4,
}: AnimatedTokenProps) {
  return (
    <g>
      <path id="chained-path" d={pathData} fill="none" stroke="none" />

      <circle r={size} fill="orangered" stroke="black" strokeWidth={2}>
        <animateMotion
          dur={`${duration}s`}
          repeatCount="indefinite"
          rotate="auto"
        >
          <mpath href="#chained-path" />
        </animateMotion>
      </circle>
    </g>
  );
}
