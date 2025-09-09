import type { TileDefinition } from "./types";

export const TILE_DEFINITIONS: TileDefinition[] = [
  // Four quarter circles
  {
    id: 1,
    paths: [
      { type: "arc", start: "lt", end: "tl", radius: "small" },
      { type: "arc", start: "tr", end: "rt", radius: "small" },
      { type: "arc", start: "rb", end: "br", radius: "small" },
      { type: "arc", start: "bl", end: "lb", radius: "small" },
    ],
  },
  // Four semicircles
  {
    id: 2,
    paths: [
      { type: "arc", start: "lb", end: "lt", radius: "large" },
      { type: "arc", start: "tl", end: "tr", radius: "large" },
      { type: "arc", start: "rt", end: "rb", radius: "large" },
      { type: "arc", start: "br", end: "bl", radius: "large" },
    ],
  },
  // Four larger quarter circles
  {
    id: 3,
    paths: [
      { type: "arc", start: "lb", end: "tr", radius: "cross" },
      { type: "arc", start: "tl", end: "rb", radius: "cross" },
      { type: "arc", start: "rt", end: "bl", radius: "cross" },
      { type: "arc", start: "br", end: "lt", radius: "cross" },
    ],
  },
  // Four quarter ellipses
  {
    id: 4,
    paths: [
      {
        type: "ellipse",
        start: "lb",
        end: "tl",
        rx: "small",
        ry: "cross",
      },
      {
        type: "ellipse",
        start: "bl",
        end: "lt",
        rx: "small",
        ry: "cross",
      },
      {
        type: "ellipse",
        start: "tr",
        end: "rb",
        rx: "small",
        ry: "cross",
      },
      {
        type: "ellipse",
        start: "rt",
        end: "br",
        rx: "small",
        ry: "cross",
      },
    ],
  },
  // TBD1
  {
    id: 5,
    paths: [
      {
        type: "ellipse",
        start: "lt",
        end: "tr",
        rx: "cross",
        ry: "small",
      },
      { type: "line", start: "tl", end: "bl" },
      {
        type: "s-curve",
        start: "lb",
        end: "rt",
        midpoint: "c",
        rx: "cross",
        ry: "small",
      },
      { type: "arc", start: "rb", end: "br", radius: "small" },
    ],
  },
];
