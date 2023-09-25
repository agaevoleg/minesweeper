export interface Cell {
  mine: boolean;
  revealed: boolean;
  marked: boolean;
  hint?: number;
}

export type Field = Cell[][];

export interface FieldConfig {
  width?: number;
  height?: number;
  mines?: number;
}

export type FieldConfigRequired = Required<FieldConfig>;