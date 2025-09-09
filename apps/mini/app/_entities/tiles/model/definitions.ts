import type { TileDefinition } from "./types";

export const TILE_DEFINITIONS: TileDefinition[] = [
  // Four quarter circles
  {
    id: 1,
    paths: [
      { type: "arc", start: "lt", end: "tl", radiusFactor: 0.25 },
      { type: "arc", start: "tr", end: "rt", radiusFactor: 0.25 },
      { type: "arc", start: "rb", end: "br", radiusFactor: 0.25 },
      { type: "arc", start: "bl", end: "lb", radiusFactor: 0.25 },
    ],
  },
  // Four semicircles
  {
    id: 2,
    paths: [
      { type: "arc", start: "lb", end: "lt", radiusFactor: 0.25 },
      { type: "arc", start: "tl", end: "tr", radiusFactor: 0.25 },
      { type: "arc", start: "rt", end: "rb", radiusFactor: 0.25 },
      { type: "arc", start: "br", end: "bl", radiusFactor: 0.25 },
    ],
  },
];
