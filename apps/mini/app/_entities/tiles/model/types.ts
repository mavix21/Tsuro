export type PointPosition =
  | "lb"
  | "lt"
  | "tl"
  | "tr"
  | "rt"
  | "rb"
  | "br"
  | "bl";

export type MidPointPosition = "c";

interface LinePath {
  type: "line";
  start: PointPosition;
  end: PointPosition;
}

interface ArcPath {
  type: "arc";
  start: PointPosition;
  end: PointPosition;
  radiusFactor: number;
  sweepFlag?: 0 | 1;
}

interface EllipsePath {
  type: "ellipse";
  start: PointPosition;
  end: PointPosition;
  rxFactor: number;
  ryFactor: number;
  sweepFlag?: 0 | 1;
}

interface SCurvePath {
  type: "s-curve";
  start: PointPosition;
  end: PointPosition;
  midpoint: MidPointPosition;
  rxFactor: number;
  ryFactor: number;
}

export type PathDefinition = LinePath | ArcPath | EllipsePath | SCurvePath;

export interface TileDefinition {
  id: number;
  paths: PathDefinition[];
}
