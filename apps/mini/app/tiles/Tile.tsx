import type { Point } from "@/entities/geometry/model/types";
import type {
  MidPointPosition,
  PathDefinition,
  PointPosition,
  TileDefinition,
} from "@/entities/tiles/model/types";

function generatePathD(
  path: PathDefinition,
  points: Record<PointPosition | MidPointPosition, Point>,
  size: number,
): string {
  const p1 = points[path.start];
  const p2 = points[path.end];

  // The power of the discriminated union is on display here!
  switch (path.type) {
    case "line":
      return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;

    case "arc": {
      const radius = size * path.radiusFactor;
      console.log("radius", radius);
      const sweep = path.sweepFlag ?? 0;
      // SVG arc command: A rx ry x-axis-rotation large-arc-flag sweep-flag x y
      const _path = `M ${p1.x} ${p1.y} A ${radius} ${radius} 0 0 ${sweep} ${p2.x} ${p2.y}`;
      console.log("path", _path);
      return _path;
    }

    case "ellipse": {
      const rx = size * path.rxFactor;
      const ry = size * path.ryFactor;
      const sweep = path.sweepFlag ?? 0;
      return `M ${p1.x} ${p1.y} A ${rx} ${ry} 0 0 ${sweep} ${p2.x} ${p2.y}`;
    }

    case "s-curve": {
      const mid = points[path.midpoint];
      const rx = size * path.rxFactor;
      const ry = size * path.ryFactor;
      // We generate two arc commands chained together
      const firstArc = `A ${rx} ${ry} 0 0 1 ${mid.x} ${mid.y}`;
      const secondArc = `A ${rx} ${ry} 0 0 0 ${p2.x} ${p2.y}`;
      return `M ${p1.x} ${p1.y} ${firstArc} ${secondArc}`;
    }

    default:
      // This should never happen with a well-defined union type
      return "";
  }
}

export function Tile({
  size = 100,
  definition,
}: {
  size?: number;
  definition: TileDefinition;
}) {
  const x = 0;
  const y = 0;
  const offset = size / 4;

  // Add center point for s-curves
  const points: Record<PointPosition | MidPointPosition, Point> = {
    lb: { x, y: y + size / 2 + offset },
    lt: { x, y: y + offset },
    tl: { x: x + offset, y },
    tr: { x: x + size / 2 + offset, y },
    rt: { x: x + size, y: y + offset },
    rb: { x: x + size, y: y + size / 2 + offset },
    br: { x: x + size / 2 + offset, y: y + size },
    bl: { x: x + offset, y: y + size },
    c: { x: size / 2, y: size / 2 },
  };

  // The rest of the component remains the same, it's beautifully simple!
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {definition.paths.map((path, index) => (
        <path
          key={`${definition.id}-${index}`}
          d={generatePathD(path, points, size)}
          fill="none"
          stroke="hotpink"
          strokeWidth={5}
        />
      ))}
    </svg>
  );
}
