import { TILE_DEFINITIONS } from "@/entities/tiles/model/definitions";

import { Tile } from "./Tile";

export default function TilePage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-wrap">
      {TILE_DEFINITIONS.map((definition) => (
        <Tile key={definition.id} size={120} definition={definition} />
      ))}
    </div>
  );
}
