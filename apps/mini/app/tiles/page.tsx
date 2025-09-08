import { Tile3 } from "./Tile3";

export default function TilePage() {
  return (
    <div className="flex flex-wrap">
      {/* four semicircles */}
      <Tile3
        size={320}
        path1Fn={(size) =>
          `M ${0 + size / 2 - size / 4} 0 A 80 80, 0 0 0, 240 0`
        }
        path2="M 320 80 A 80 80, 0 0 0, 320 240"
        path3="M 0 240 A 80 80, 0 0 0, 0 80"
        path4={`M ${240} ${320} A 80 80, 0 0 0, 80 320`}
      />

      {/* four quarter circles */}
      <Tile3
        size={320}
        path1Fn={(size) => `M 0 ${size / 4} A 80 80 0 0 0 80 0`}
        path2={`M 320 80 A 100 100 0 0 1 240 0`}
        path3="M 0 240 A 80 80, 0 0 1, 80 320"
        path4={`M 320 240 a 80 80 0 0 0 -80 80`}
      />

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

      {/* new */}
      <Tile3
        size={320}
        path1Fn={(size) => `M 0 ${size / 4} A 240 80 0 0 0 240 0`}
        path2={`M 80 0 V 320`}
        path3="M 0 240 A 160 80, 0 0 0, 160 160 A 160 80, 0 0 1, 320 80"
        path4={`M 320 240 a 80 80 0 0 0 -80 80`}
      />
    </div>
  );
}
