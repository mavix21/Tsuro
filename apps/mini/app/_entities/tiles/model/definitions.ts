import type { TileDefinition } from "./types";

export const TILE_DEFINITIONS: TileDefinition[] = [
  // Four quarter circles
  {
    id: 1,
    paths: [
      { type: "arc", start: "lt", end: "tl", radius: "offset" },
      { type: "arc", start: "tr", end: "rt", radius: "offset" },
      { type: "arc", start: "rb", end: "br", radius: "offset" },
      { type: "arc", start: "bl", end: "lb", radius: "offset" },
    ],
  },
  // Four semi-ellipses
  {
    id: 2,
    paths: [
      {
        type: "ellipse",
        start: "lb",
        end: "lt",
        rx: "offset",
        ry: "halfMinusOffset",
      },
      {
        type: "ellipse",
        start: "tl",
        end: "tr",
        rx: "halfMinusOffset",
        ry: "offset",
      },
      {
        type: "ellipse",
        start: "rt",
        end: "rb",
        rx: "offset",
        ry: "halfMinusOffset",
      },
      {
        type: "ellipse",
        start: "br",
        end: "bl",
        rx: "halfMinusOffset",
        ry: "offset",
      },
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
        rx: "offset",
        ry: "cross",
      },
      {
        type: "ellipse",
        start: "bl",
        end: "lt",
        rx: "offset",
        ry: "cross",
      },
      {
        type: "ellipse",
        start: "tr",
        end: "rb",
        rx: "offset",
        ry: "cross",
      },
      {
        type: "ellipse",
        start: "rt",
        end: "br",
        rx: "offset",
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
        ry: "offset",
      },
      { type: "line", start: "tl", end: "bl" },
      {
        type: "s-curve",
        start: "lb",
        end: "rt",
        midpoint: "c",
        rx: "cross",
        ry: "offset",
      },
      { type: "arc", start: "rb", end: "br", radius: "offset" },
    ],
  },
  // TBD2
  {
    id: 6,
    paths: [
      { type: "arc", start: "lt", end: "tl", radius: "offset" },
      { type: "arc", start: "tr", end: "rt", radius: "offset" },
      { type: "line", start: "lb", end: "rb" },
      { type: "arc", start: "br", end: "bl", radius: "halfMinusOffset" },
    ],
  },
  // TBD3
  {
    id: 7,
    paths: [
      { type: "arc", start: "lt", end: "tl", radius: "offset" },
      { type: "arc", start: "lb", end: "tr", radius: "cross" },
      { type: "arc", start: "rt", end: "rb", radius: "halfMinusOffset" },
      { type: "arc", start: "br", end: "bl", radius: "halfMinusOffset" },
    ],
  },
];
