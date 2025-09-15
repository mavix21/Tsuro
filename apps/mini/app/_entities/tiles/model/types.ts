import type { POSITIONS } from "./constants";

export type PointPosition = (typeof POSITIONS)[number];

export type MidPointPosition = "c";

export type RadiusSize = "offset" | "halfMinusOffset" | "cross";

interface LinePath {
  type: "line";
  start: PointPosition;
  end: PointPosition;
}

interface ArcPath {
  type: "arc";
  start: PointPosition;
  end: PointPosition;
  radius: RadiusSize;
  sweepFlag?: 0 | 1;
}

interface EllipsePath {
  type: "ellipse";
  start: PointPosition;
  end: PointPosition;
  rx: RadiusSize;
  ry: RadiusSize;
  sweepFlag?: 0 | 1;
}

interface SCurvePath {
  type: "s-curve";
  start: PointPosition;
  end: PointPosition;
  midpoint: MidPointPosition;
  rx: RadiusSize;
  ry: RadiusSize;
  sweepFlag?: 0 | 1;
}

export type PathDefinition = LinePath | ArcPath | EllipsePath | SCurvePath;

export interface TileDefinition {
  id: number;
  paths: PathDefinition[];
}
