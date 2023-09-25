import type { Cell, FieldConfigRequired } from './types/minesweeper';

export const DEFAULT_CONFIG = {
  width: 10,
  height: 10,
  mines: 10,
} as FieldConfigRequired;

export const DEFAULT_CELL = {
  mine: false,
  revealed: false,
  marked: false,
} as Cell;
