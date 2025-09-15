import type { TileDefinition } from "@/entities/tiles/model/types";

import { generatePathD, generateTilePoints } from "../playground/utils";

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
  const points = generateTilePoints(size, offset, x, y);

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
            d={generatePathD(path, points, size, offset)}
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
