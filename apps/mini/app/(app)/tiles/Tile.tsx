import type { Point } from "@/entities/geometry/model/types";
import type {
  MidPointPosition,
  PointPosition,
  TileDefinition,
} from "@/entities/tiles/model/types";

import { generatePathD } from "../playground/utils";

interface TileProps {
  size?: number;
  definition: TileDefinition;
  rotation?: number;
  isSelected?: boolean;
  onRotate?: () => void;
}

export function Tile({
  size = 100,
  definition,
  rotation = 0,
  isSelected,
  onRotate,
}: TileProps) {
  const x = 0;
  const y = 0;
  const offset = size / 3;

  // Add center point for s-curves
  const points: Record<PointPosition | MidPointPosition, Point> = {
    lb: { x, y: y + size - offset },
    lt: { x, y: y + offset },
    tl: { x: x + offset, y },
    tr: { x: x + size - offset, y },
    rt: { x: x + size, y: y + offset },
    rb: { x: x + size, y: y + size - offset },
    br: { x: x + size - offset, y: y + size },
    bl: { x: x + offset, y: y + size },
    c: { x: size / 2, y: size / 2 },
  };

  // The rest of the component remains the same, it's beautifully simple!
  return (
    <div className="relative">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        className="border border-blue-500 transition-transform"
        style={{ transform: `rotate(${rotation * 90}deg)` }}
      >
        {definition.paths.map((path, index) => (
          <path
            id={`${definition.id}-${index}`}
            key={`${definition.id}-${index}`}
            d={generatePathD(path, points, offset, size)}
            fill="none"
            stroke="hotpink"
            strokeWidth={5}
          />
        ))}
      </svg>
      {isSelected && onRotate && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRotate();
          }}
          className="bg-primary hover:bg-primary/90 text-primary-foreground absolute -top-2 -right-2 size-6 rounded-full text-xs transition-colors"
          title="Rotate tile"
        >
          ↻
        </button>
      )}
    </div>
  );
}
