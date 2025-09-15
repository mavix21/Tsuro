"use client";

import * as React from "react";

import { cn } from "@tsuro/ui/lib/utils";

import { TILE_DEFINITIONS } from "@/entities/tiles/model/definitions";

import { Tile } from "../tiles/Tile";
import { useGameBoard } from "./use-gameboard";
import { generatePathD, generateTilePoints, getRotatedPosition } from "./utils";

interface PlaygroundBoardProps {
  boardSize: number;
}

export function PlaygroundBoard({ boardSize }: PlaygroundBoardProps) {
  const {
    selectedTile,
    selectedTileRotation,
    connectedPaths,
    board,
    hoveredCell,
    actions,
  } = useGameBoard(boardSize);

  const renderCell = (x: number, y: number) => {
    const tile = board[y]?.[x];
    const isHovered = hoveredCell?.x === x && hoveredCell.y === y;
    const canPlace = !tile && selectedTile;

    return (
      <div
        key={`${x}-${y}`}
        className="relative"
        onMouseEnter={() => actions.setHoveredCell({ x, y })}
        onMouseLeave={() => actions.setHoveredCell(null)}
      >
        {tile ? (
          <div
            className="relative cursor-pointer"
            onClick={() => actions.handleCellClick(x, y)}
          >
            <Tile size={80} definition={tile} rotation={tile.rotation} />
            <div className="pointer-events-none absolute inset-0">
              <svg
                width={80}
                height={80}
                viewBox="0 0 100 100"
                className="absolute inset-0"
              >
                {tile.paths.map((path, index) => {
                  const isConnected = connectedPaths.has(`${x}-${y}-${index}`);
                  if (!isConnected) return null;
                  const size = 100;
                  const offset = size / 3;
                  const points = generateTilePoints(size, offset);

                  const rotatedStart = getRotatedPosition(
                    path.start,
                    tile.rotation,
                  );
                  const rotatedEnd = getRotatedPosition(
                    path.end,
                    tile.rotation,
                  );
                  const newPath = {
                    ...path,
                    start: rotatedStart,
                    end: rotatedEnd,
                  };
                  const pathD = generatePathD(newPath, points, size, offset);

                  return (
                    <path
                      key={index}
                      d={pathD}
                      stroke="#10b981"
                      strokeWidth="6"
                      fill="none"
                      opacity="0.8"
                    />
                  );
                })}
              </svg>
            </div>
            {isHovered && (
              <div className="bg-destructive/40 absolute inset-0 flex items-center justify-center rounded-md">
                <span className="text-destructive-foreground text-xs font-semibold">
                  Click to remove
                </span>
              </div>
            )}
          </div>
        ) : (
          <div
            className={cn(
              "size-20 border-1 border-dashed transition-all duration-200",
              canPlace && isHovered && "border-purple-400 bg-purple-50",
              canPlace &&
                "cursor-pointer border-gray-300 hover:border-purple-300",
              !selectedTile && "border-gray-200",
            )}
            onClick={() => actions.handleCellClick(x, y)}
          />
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Available Tiles</h3>
          {/*<div className="flex gap-2">
                    {tokenPosition && (
                      <Button onClick={handleRemoveToken} variant="outline" size="sm" disabled={isTokenMoving}>
                        Remove Token
                      </Button>
                    )}
                    <Button onClick={handleClearBoard} variant="outline" size="sm" disabled={isTokenMoving}>
                      Clear All
                    </Button>
                  </div>*/}
        </div>

        <div className="bg-card/50 flex flex-wrap gap-3 rounded-lg border p-4">
          {TILE_DEFINITIONS.map((tileDefinition) => {
            const isSelected = selectedTile?.id === tileDefinition.id;
            return (
              <div
                key={tileDefinition.id}
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  isSelected && "shadow-lg ring-2 ring-purple-500",
                  "hover:scale-105 hover:shadow-md",
                )}
                onClick={() => actions.handleTileSelect(tileDefinition)}
              >
                <Tile
                  size={80}
                  definition={tileDefinition}
                  isSelected={isSelected}
                  onRotate={isSelected ? actions.handleTileRotate : undefined}
                  rotation={isSelected ? selectedTileRotation : 0}
                />
              </div>
            );
          })}
        </div>

        {selectedTile && (
          <div className="text-muted-foreground bg-muted flex items-center gap-2 rounded-lg p-2 text-sm">
            <div className="bg-primary size-2 rounded-full"></div>
            <span className="text-xs">
              Click anywhere on an empty space to place the tile.
            </span>
          </div>
        )}
      </div>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Playground Board</h3>
        <div className="text-muted-foreground bg-muted/30 rounded-md p-3 text-sm">
          <div className="mb-1 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
            <span>Green paths show connections between adjacent tiles</span>
          </div>
          <div className="mb-1 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <span>Blue dots are valid token placement positions</span>
          </div>
          <div className="mb-1 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <span>Red dot is the current token position</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <span>Click on placed tiles to remove them</span>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative">
            <div
              className="from-card to-muted/20 border-border grid border-2 bg-gradient-to-br p-6 shadow-lg"
              style={{
                gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: boardSize }).map((_, y) =>
                Array.from({ length: boardSize }).map((_, x) =>
                  renderCell(x, y),
                ),
              )}
            </div>
            {/*{renderTokenPositions()}
                  {renderToken()}*/}
          </div>
        </div>
      </div>
    </div>
  );
}
