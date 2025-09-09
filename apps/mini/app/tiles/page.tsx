import { TILE_DEFINITIONS } from "@/entities/tiles/model/definitions";

import { Tile } from "./Tile";

export default function TilePage() {
  return (
    <div className="flex flex-wrap">
      {TILE_DEFINITIONS.map((definition) => (
        <Tile key={definition.id} size={320} definition={definition} />
      ))}
    </div>
  );
}
