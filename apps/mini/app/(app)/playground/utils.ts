import type { Point } from "@/entities/geometry/model/types";
import type {
  MidPointPosition,
  PathDefinition,
  PointPosition,
  RadiusSize,
  TileDefinition,
} from "@/entities/tiles/model/types";

export interface PlacedTile extends TileDefinition {
  rotation: number;
}

export interface TokenPosition {
  x: number;
  y: number;
  position: PointPosition;
}

export const getRotatedPosition = (
  pos: PointPosition,
  rotation: number,
): PointPosition => {
  // Positions in clockwise order
  const positions = ["tl", "tr", "rt", "rb", "br", "bl", "lb", "lt"] as const;

  const index = positions.indexOf(pos);
  if (index === -1) return pos;

  const rotatedIndex = (index + rotation * 2) % positions.length;

  return positions[rotatedIndex] ?? pos;
};

export const getOppositeEdgePosition = (pos: PointPosition): PointPosition => {
  const opposites = {
    tl: "bl",
    tr: "br",
    br: "tr",
    bl: "tl",
    lt: "rt",
    rt: "lt",
    rb: "lb",
    lb: "rb",
  } as const;

  return opposites[pos];
};

export const doPositionsConnect = (
  pos1: PointPosition,
  pos2: PointPosition,
  direction: "horizontal" | "vertical",
) => {
  if (direction === "horizontal") {
    const leftTileRightPositions: PointPosition[] = ["rt", "rb"];
    const rightTileLeftPositions: PointPosition[] = ["lt", "lb"];

    return (
      (leftTileRightPositions.includes(pos1) &&
        rightTileLeftPositions.includes(pos2)) ||
      (leftTileRightPositions.includes(pos2) &&
        rightTileLeftPositions.includes(pos1))
    );
  } else {
    const topTileBottomPositions: PointPosition[] = ["bl", "br"];
    const bottomTileTopPositions: PointPosition[] = ["tl", "tr"];
    return (
      (topTileBottomPositions.includes(pos1) &&
        bottomTileTopPositions.includes(pos2)) ||
      (topTileBottomPositions.includes(pos2) &&
        bottomTileTopPositions.includes(pos1))
    );
  }
};

export const getDirectionMapping = (dx: number, dy: number) => {
  if (dx === 1 && dy === 0) {
    return {
      direction: "horizontal" as const,
      tokenExits: ["rt", "rb"] as [PointPosition, PointPosition],
      newEntries: ["lt", "lb"] as [PointPosition, PointPosition],
    };
  }

  if (dx === -1 && dy === 0) {
    return {
      direction: "horizontal" as const,
      tokenExits: ["lt", "lb"] as [PointPosition, PointPosition],
      newEntries: ["rt", "rb"] as [PointPosition, PointPosition],
    };
  }

  if (dx === 0 && dy === 1) {
    return {
      direction: "vertical" as const,
      tokenExits: ["bl", "br"] as [PointPosition, PointPosition],
      newEntries: ["tl", "tr"] as [PointPosition, PointPosition],
    };
  }

  if (dx === 0 && dy === -1) {
    return {
      direction: "vertical" as const,
      tokenExits: ["tl", "tr"] as [PointPosition, PointPosition],
      newEntries: ["bl", "br"] as [PointPosition, PointPosition],
    };
  }

  return null;
};

export const getTargetEntryPosition = (
  tokenPos: PointPosition,
  dx: number,
  dy: number,
) => {
  if (dx === 1 && dy === 0) return tokenPos === "rt" ? "lt" : "lb"; // right: rt->lt, rb->lb
  if (dx === -1 && dy === 0) return tokenPos === "lt" ? "rt" : "rb"; // left: lt->rt, lb->rb
  if (dy === 1 && dx === 0) return tokenPos === "bl" ? "tl" : "tr"; // down: bl->tl, br->tr
  if (dy === -1 && dx === 0) return tokenPos === "tl" ? "bl" : "br"; // up: tl->bl, tr->br
  return null;
};

export const checkTokenTileConnections = (
  tokenPos: TokenPosition,
  newTilePos: { x: number; y: number },
  tokenTile: PlacedTile,
  newTile: PlacedTile,
): boolean => {
  const dx = newTilePos.x - tokenPos.x;
  const dy = newTilePos.y - tokenPos.y;

  const directionMapping = getDirectionMapping(dx, dy);
  if (!directionMapping) return false;

  const { tokenExits } = directionMapping;

  if (tokenExits.includes(tokenPos.position)) return false;

  const targetEntryPosition = getTargetEntryPosition(tokenPos.position, dx, dy);
  if (!targetEntryPosition) return false;

  // Check if any path in the new tile has target entry position
  return newTile.paths.some((path) => {
    const rotatedStart = getRotatedPosition(path.start, newTile.rotation);
    const rotatedEnd = getRotatedPosition(path.end, newTile.rotation);

    return (
      rotatedStart === targetEntryPosition || rotatedEnd === targetEntryPosition
    );
  });
};

export const getNewTileEntryPosition = (
  tokenPos: TokenPosition,
  newTilePos: { x: number; y: number },
  newTile: PlacedTile,
): TokenPosition | null => {
  const dx = newTilePos.x - tokenPos.x;
  const dy = newTilePos.y - tokenPos.y;

  const targetEntryPosition = getTargetEntryPosition(tokenPos.position, dx, dy);
  if (!targetEntryPosition) return null;

  // Find the path that has this target entry position
  const hasMatchingPath = newTile.paths.some((path) => {
    const rotatedStart = getRotatedPosition(path.start, newTile.rotation);
    const rotatedEnd = getRotatedPosition(path.end, newTile.rotation);
    return (
      rotatedStart === targetEntryPosition || rotatedEnd === targetEntryPosition
    );
  });

  return hasMatchingPath
    ? { x: newTilePos.x, y: newTilePos.y, position: targetEntryPosition }
    : null;
};

export const calculateConnectedPaths = (newBoard: (PlacedTile | null)[][]) => {
  const boardSize = newBoard.length;
  const connected = new Set<string>();

  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const tile = newBoard[y]?.[x];
      if (!tile) continue;

      const adjacentChecks = [
        { dx: 1, dy: 0, direction: "horizontal" },
        { dx: 0, dy: 1, direction: "vertical" },
      ] as const;

      adjacentChecks.forEach(({ dx, dy, direction }) => {
        const adjX = x + dx;
        const adjY = y + dy;

        if (adjX < 0 || adjX >= boardSize || adjY < 0 || adjY >= boardSize)
          return;

        const adjTile = newBoard[adjY]?.[adjX];
        if (!adjTile) return;

        // Check each path in adjacent tile
        tile.paths.forEach((path, pathIndex) => {
          const rotatedStart = getRotatedPosition(path.start, tile.rotation);
          const rotatedEnd = getRotatedPosition(path.end, tile.rotation);

          adjTile.paths.forEach((adjPath, adjPathIndex) => {
            const adjRotatedStart = getRotatedPosition(
              adjPath.start,
              adjTile.rotation,
            );
            const adjRotatedEnd = getRotatedPosition(
              adjPath.end,
              adjTile.rotation,
            );

            // Checks if any endpoints connect
            const connections = [
              [rotatedStart, adjRotatedStart],
              [rotatedStart, adjRotatedEnd],
              [rotatedEnd, adjRotatedStart],
              [rotatedEnd, adjRotatedEnd],
            ] as const;

            connections.forEach(([pos1, pos2]) => {
              if (doPositionsConnect(pos1, pos2, direction)) {
                connected.add(`${x}-${y}-${pathIndex}`);
                connected.add(`${adjX}-${adjY}-${adjPathIndex}`);
              }
            });
          });
        });
      });
    }
  }

  return connected;
};

function getRadiusInPixels(size: RadiusSize, offset: number, tileSize: number) {
  switch (size) {
    case "offset":
      return offset;
    case "halfMinusOffset":
      return tileSize / 2 - offset;
    case "cross":
      return tileSize - offset;
  }
}

export function generatePathD(
  path: PathDefinition,
  points: Record<PointPosition | MidPointPosition, Point>,
  offset: number,
  size: number,
): string {
  const p1 = points[path.start];
  const p2 = points[path.end];

  // The power of the discriminated union is on display here!
  switch (path.type) {
    case "line":
      return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;

    case "arc": {
      const radius = getRadiusInPixels(path.radius, offset, size);
      const sweep = path.sweepFlag ?? 0;
      // SVG arc command: A rx ry x-axis-rotation large-arc-flag sweep-flag x y
      const _path = `M ${p1.x} ${p1.y} A ${radius} ${radius} 0 0 ${sweep} ${p2.x} ${p2.y}`;
      return _path;
    }

    case "ellipse": {
      const rx = getRadiusInPixels(path.rx, offset, size);
      const ry = getRadiusInPixels(path.ry, offset, size);
      const sweep = path.sweepFlag ?? 0;
      const _path = `M ${p1.x} ${p1.y} A ${rx} ${ry} 0 0 ${sweep} ${p2.x} ${p2.y}`;
      return _path;
    }

    case "s-curve": {
      const mid = points[path.midpoint];
      const rx = getRadiusInPixels(path.rx, offset, size);
      const ry = getRadiusInPixels(path.ry, offset, size);
      const sweep = path.sweepFlag ?? 0;
      // We generate two arc commands chained together
      const firstArc = `A ${rx} ${ry} 0 0 ${sweep} ${mid.x} ${mid.y}`;
      const secondArc = `A ${rx} ${ry} 0 0 ${sweep === 0 ? 1 : 0} ${p2.x} ${p2.y}`;
      return `M ${p1.x} ${p1.y} ${firstArc} ${secondArc}`;
    }

    default:
      // This should never happen with a well-defined union type
      return "";
  }
}
