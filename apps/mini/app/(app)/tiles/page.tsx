import { TILE_DEFINITIONS } from "@/entities/tiles/model/definitions";

import { Tile } from "./Tile";

export default function TilePage() {
  const tileSize = 120;
  return (
    <div className="mx-auto max-w-3xl">
      <div
        className="relative flex w-full flex-wrap bg-amber-200/50"
        style={{ width: tileSize * 6 }}
      >
        {TILE_DEFINITIONS.slice(0, 2).map((definition) => (
          <Tile key={definition.id} size={tileSize} definition={definition} />
        ))}
      </div>
    </div>
  );
}
