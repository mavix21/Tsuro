import { TILE_DEFINITIONS } from "@/entities/tiles/model/definitions";

import { Tile } from "./Tile";
import { TileOld } from "./TileOld";

export default function TilePage() {
  return (
    <div className="flex flex-wrap">
      {/* four semicircles */}
      <TileOld
        size={320}
        path1Fn={(size, { lt, lb }) =>
          `M ${lb.x} ${lb.y}, A ${size / 4} ${size / 4}, 0 0 0, ${lt.x} ${lt.y}`
        }
        path2Fn={(size, { tl, tr }) =>
          `M ${tl.x} ${tl.y}, A ${size / 4} ${size / 4}, 0 0 0, ${tr.x} ${tr.y}`
        }
        path3Fn={(size, { rt, rb }) =>
          `M ${rt.x} ${rt.y}, A ${size / 4} ${size / 4}, 0 0 0, ${rb.x} ${rb.y}`
        }
        path4Fn={(size, { br, bl }) =>
          `M ${br.x} ${br.y}, A ${size / 4} ${size / 4}, 0 0 0, ${bl.x} ${bl.y}`
        }
      />

      {/* four quarter circles */}
      <TileOld
        size={320}
        path1Fn={(size, { lt, tl }) =>
          `M ${lt.x} ${lt.y} A ${size / 4} ${size / 4} 0 0 0 ${tl.x} ${tl.y}`
        }
        path2Fn={(size, { tr, rt }) =>
          `M ${tr.x} ${tr.y}, A ${size / 4} ${size / 4}, 0 0 0, ${rt.x} ${rt.y}`
        }
        path3Fn={(size, { rb, br }) =>
          `M ${rb.x} ${rb.y}, A ${size / 4} ${size / 4}, 0 0 0, ${br.x} ${br.y}`
        }
        path4Fn={(size, { bl, lb }) =>
          `M ${bl.x} ${bl.y}, A ${size / 4} ${size / 4}, 0 0 0, ${lb.x} ${lb.y}`
        }
      />

      <Tile size={320} definition={TILE_DEFINITIONS[0]!} />

      <TileOld
        size={320}
        path1Fn={(size, { lt, tl }) =>
          `M ${lt.x} ${lt.y} A ${size / 4} ${size / 4} 0 0 0 ${tl.x} ${tl.y}`
        }
        path2Fn={(size, { tr, rt }) =>
          `M ${tr.x} ${tr.y}, A ${size / 4} ${size / 4}, 0 0 0, ${rt.x} ${rt.y}`
        }
        path3Fn={(size, { rb, br }) =>
          `M ${rb.x} ${rb.y}, A ${size / 4} ${size / 4}, 0 0 0, ${br.x} ${br.y}`
        }
        path4Fn={(size, { bl, lb }) =>
          `M ${bl.x} ${bl.y}, A ${size / 4} ${size / 4}, 0 0 0, ${lb.x} ${lb.y}`
        }
      />
      {/* 
      <Tile3
        size={320}
        path1Fn={(size) => `M 0 ${size / 4} A 80 80 0 0 0 80 0`}
        path2={`M 240 0 A ${320 / 4} 240 0 0 0 320 240`}
        path3="M 0 240 A 160 80, 0 0 0, 160 160 A 160 80, 0 0 1, 320 80"
        path4={`M ${240} ${320} A 80 80, 0 0 0, 80 320`}
      />

      <Tile3
        size={320}
        path1Fn={(size) =>
          `M ${0 + size / 2 - size / 4} 0 A 80 80, 0 0 0, 240 0`
        }
        path2="M 320 80 A 80 80, 0 0 0, 320 240"
        path3="M 0 240 A 80 80, 0 0 0, 0 80"
        path4={`M ${240} ${320} A 80 80, 0 0 0, 80 320`}
      />

      <Tile3
        size={320}
        path1Fn={(size) => `M 0 ${size / 4} A 80 80 0 0 0 80 0`}
        path2={`M 240 0 A ${320 / 4} 240 0 0 0 320 240`}
        path3="M 0 240 A 160 80, 0 0 0, 160 160 A 160 80, 0 0 1, 320 80"
        path4={`M ${240} ${320} A 80 80, 0 0 0, 80 320`}
      />
 */}
      <TileOld
        size={320}
        path1Fn={(size) => `M 0 ${size / 4} A 240 80 0 0 0 240 0`}
        path2Fn={(size, { tl }) => `M ${tl.x} ${tl.y} V 320`}
        path3Fn={() =>
          "M 0 240 A 160 80, 0 0 0, 160 160 A 160 80, 0 0 1, 320 80"
        }
        path4Fn={() => `M 320 240 a 80 80 0 0 0 -80 80`}
      />

      <Tile size={320} definition={TILE_DEFINITIONS[1]!} />
    </div>
  );
}
