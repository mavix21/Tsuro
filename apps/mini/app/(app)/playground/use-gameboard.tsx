import * as React from "react";

import type { TileDefinition } from "@/entities/tiles/model/types";

import type { PlacedTile, TokenPosition } from "./utils";
import {
  calculateConnectedPaths,
  checkTokenTileConnections,
  getNewTileEntryPosition,
} from "./utils";

const initializeBoard = (boardSize: number) => {
  return Array(boardSize)
    .fill(null)
    .map(() => Array(boardSize).fill(null) as (PlacedTile | null)[]);
};

export function useGameBoard(boardSize: number) {
  const [board, setBoard] = React.useState<(PlacedTile | null)[][]>(() =>
    initializeBoard(boardSize),
  );
  const [selectedTile, setSelectedTile] = React.useState<TileDefinition | null>(
    null,
  );
  const [selectedTileRotation, setSelectedTileRotation] = React.useState(0);
  const [hoveredCell, setHoveredCell] = React.useState<{
    x: number;
    y: number;
  } | null>(null);
  const [connectedPaths, setConnectedPaths] = React.useState<Set<string>>(
    () => new Set(),
  );
  const [tokenPosition, setTokenPosition] =
    React.useState<TokenPosition | null>(null);
  const [isTokenMoving, setIsTokenMoving] = React.useState(false);

  const _calculateConnectedPaths = React.useCallback(
    (newBoard: (PlacedTile | null)[][]) => {
      const connectedPaths = calculateConnectedPaths(newBoard);
      setConnectedPaths(connectedPaths);
    },
    [],
  );

  const handleCellClick = React.useCallback(
    (x: number, y: number) => {
      const existingTile = board[y]?.[x];

      if (existingTile) {
        const newBoard = [...board];
        if (newBoard[y]?.[x]) {
          newBoard[y][x] = null;
        }
        setBoard(newBoard);
        _calculateConnectedPaths(newBoard);
        return;
      }

      if (!selectedTile) return;

      const newBoard = [...board];
      const tileToPlace = {
        ...selectedTile,
        rotation: selectedTileRotation,
      };

      if (newBoard[y]?.[x] !== undefined) {
        newBoard[y][x] = tileToPlace;
      }
      setBoard(newBoard);
      _calculateConnectedPaths(newBoard);

      if (!tokenPosition || isTokenMoving) return;

      // Check if tile is placed at token's current position
      if (tokenPosition.x === x && tokenPosition.y === y) {
        // TODO moveToken
        return;
      }

      // Check if tile is adjacent to token and creates a connection path
      const isAdjacent =
        (Math.abs(tokenPosition.x - x) === 1 && tokenPosition.y === y) ||
        (Math.abs(tokenPosition.y - y) === 1 && tokenPosition.x === x);

      if (!isAdjacent) return;

      const tokenTile = newBoard[tokenPosition.y]?.[tokenPosition.x];
      if (!tokenTile) return;

      const connectionInfo = checkTokenTileConnections(
        tokenPosition,
        { x, y },
        tokenTile,
        tileToPlace,
      );
      if (!connectionInfo) return;

      const newTileEntryPos = getNewTileEntryPosition(
        tokenPosition,
        { x, y },
        tileToPlace,
      );
      if (newTileEntryPos) {
        // moveToken
      }
    },
    [
      board,
      selectedTile,
      isTokenMoving,
      selectedTileRotation,
      tokenPosition,
      _calculateConnectedPaths,
    ],
  );

  const handleTileSelect = React.useCallback(
    (tileDefinition: TileDefinition) => {
      setSelectedTile((selectedTile) => {
        const isSelected = selectedTile?.id === tileDefinition.id;
        if (isSelected) {
          return null;
        } else {
          setSelectedTileRotation(0);
          return tileDefinition;
        }
      });
    },
    [],
  );

  const handleTileRotate = React.useCallback(() => {
    if (!selectedTile) return;
    setSelectedTileRotation((prevRotation) => prevRotation + 1);
  }, [selectedTile]);

  const actions = React.useMemo(
    () => ({
      setBoard,
      setConnectedPaths,
      setHoveredCell,
      handleCellClick,
      handleTileSelect,
      handleTileRotate,
    }),
    [handleCellClick, handleTileSelect, handleTileRotate],
  );

  return {
    board,
    tokenPosition,
    isTokenMoving,
    selectedTile,
    hoveredCell,
    selectedTileRotation,
    connectedPaths,
    actions,
  };
}
