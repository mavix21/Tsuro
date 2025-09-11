import type { TileDefinition } from "./types";

export const TILE_DEFINITIONS: TileDefinition[] = [
  // Four semi-ellipses
  {
    id: 1,
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
  {
    id: 2,
    paths: [
      { type: "arc", start: "lt", end: "tl", radius: "offset" },
      { type: "arc", start: "lb", end: "tr", radius: "cross" },
      { type: "arc", start: "rt", end: "rb", radius: "halfMinusOffset" },
      { type: "arc", start: "br", end: "bl", radius: "halfMinusOffset" },
    ],
  },
  {
    id: 3,
    paths: [
      { type: "arc", start: "lt", end: "tl", radius: "offset" },
      { type: "arc", start: "tr", end: "rt", radius: "offset" },
      { type: "line", start: "lb", end: "rb" },
      { type: "arc", start: "br", end: "bl", radius: "halfMinusOffset" },
    ],
  },

  // Four quarter circles
  {
    id: 4,
    paths: [
      { type: "arc", start: "lt", end: "tl", radius: "offset" },
      { type: "arc", start: "tr", end: "rt", radius: "offset" },
      { type: "arc", start: "rb", end: "br", radius: "offset" },
      { type: "arc", start: "bl", end: "lb", radius: "offset" },
    ],
  },

  {
    id: 5,
    paths: [
      { type: "ellipse", start: "lb", end: "tl", rx: "offset", ry: "cross" },
      { type: "ellipse", start: "lt", end: "tr", rx: "cross", ry: "offset" },
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

  {
    id: 6,
    paths: [
      { type: "line", start: "lt", end: "rt" },
      {
        type: "arc",
        start: "tl",
        end: "tr",
        radius: "halfMinusOffset",
      },
      { type: "line", start: "lb", end: "rb" },
      {
        type: "arc",
        start: "br",
        end: "bl",
        radius: "halfMinusOffset",
      },
    ],
  },

  {
    id: 7,
    paths: [
      {
        type: "arc",
        start: "tl",
        end: "tr",
        radius: "halfMinusOffset",
      },
      {
        type: "s-curve",
        start: "lt",
        end: "rb",
        midpoint: "c",
        rx: "cross",
        ry: "offset",
        sweepFlag: 1,
      },
      {
        type: "arc",
        start: "br",
        end: "bl",
        radius: "halfMinusOffset",
      },
      {
        type: "s-curve",
        start: "lb",
        end: "rt",
        midpoint: "c",
        rx: "cross",
        ry: "offset",
      },
    ],
  },

  {
    id: 8,
    paths: [
      { type: "ellipse", start: "lb", end: "tl", rx: "offset", ry: "cross" },
      {
        type: "s-curve",
        start: "lt",
        end: "rb",
        midpoint: "c",
        rx: "cross",
        ry: "offset",
        sweepFlag: 1,
      },
      {
        type: "arc",
        start: "br",
        end: "bl",
        radius: "halfMinusOffset",
      },
      { type: "arc", start: "tr", end: "rt", radius: "offset" },
    ],
  },

  {
    id: 9,
    paths: [
      { type: "ellipse", start: "bl", end: "lt", rx: "offset", ry: "cross" },
      {
        type: "s-curve",
        start: "lb",
        end: "rt",
        midpoint: "c",
        rx: "cross",
        ry: "offset",
      },
      {
        type: "ellipse",
        start: "tl",
        end: "tr",
        rx: "halfMinusOffset",
        ry: "offset",
      },
      { type: "arc", start: "rb", end: "br", radius: "offset" },
    ],
  },

  {
    id: 10,
    paths: [
      { type: "ellipse", start: "bl", end: "lt", rx: "offset", ry: "cross" },
      { type: "ellipse", start: "lb", end: "tl", rx: "offset", ry: "cross" },
      { type: "arc", start: "tr", end: "rt", radius: "offset" },
      { type: "arc", start: "rb", end: "br", radius: "offset" },
    ],
  },

  {
    id: 11,
    paths: [
      { type: "arc", start: "lb", end: "tr", radius: "cross" },
      { type: "ellipse", start: "bl", end: "lt", rx: "offset", ry: "cross" },
      { type: "ellipse", start: "tl", end: "rt", rx: "cross", ry: "offset" },
      { type: "arc", start: "rb", end: "br", radius: "offset" },
    ],
  },

  // Four quarter ellipses
  {
    id: 12,
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
    id: 13,
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
    id: 14,
    paths: [
      { type: "arc", start: "lt", end: "tl", radius: "offset" },
      { type: "arc", start: "tr", end: "rt", radius: "offset" },
      { type: "line", start: "lb", end: "rb" },
      { type: "arc", start: "br", end: "bl", radius: "halfMinusOffset" },
    ],
  },
  // TBD3
  {
    id: 15,
    paths: [
      { type: "arc", start: "lt", end: "tl", radius: "offset" },
      { type: "arc", start: "lb", end: "tr", radius: "cross" },
      { type: "arc", start: "rt", end: "rb", radius: "halfMinusOffset" },
      { type: "arc", start: "br", end: "bl", radius: "halfMinusOffset" },
    ],
  },

  // Four larger quarter circles
  {
    id: 34,
    paths: [
      { type: "arc", start: "lb", end: "tr", radius: "cross" },
      { type: "arc", start: "tl", end: "rb", radius: "cross" },
      { type: "arc", start: "rt", end: "bl", radius: "cross" },
      { type: "arc", start: "br", end: "lt", radius: "cross" },
    ],
  },
];
