import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { getOwner } from '@ember/application';

import MinesweeperGameModel from '../models/minesweeper-game';
import type { FieldConfig } from '../types/minesweeper';
import { DEFAULT_CONFIG } from '../constants';

const STATE = {
  INIT: 0,
  CONFIG: 1, 
  GAME: 2,
}

export default class MinesweeperComponent extends Component {
  @tracked state = 0;
  
  @tracked configuration: FieldConfig = {};

  @tracked game?: MinesweeperGameModel;
  
  defaultConfig = DEFAULT_CONFIG;
 
  get isInit(): boolean {
    return this.state === STATE.INIT;
  }

  get isConfiguration(): boolean {
    return this.state === STATE.CONFIG; 
  }

  get isFail(): boolean {
    return this.game !== undefined && this.game.field.flat().filter((cell) => cell.revealed && cell.mine).length > 0;
  }

  get isWin(): boolean {
    return this.game !== undefined && this.game.field.flat().filter((cell) => !cell.revealed && !cell.mine ).length === 0;
  }

  get isEnded(): boolean {
    return this.isFail || this.isWin;
  }

  get modifiedConfig(): FieldConfig {
    const result: FieldConfig = {};

    for (const key in this.configuration) {
      const value = this.configuration[key as keyof FieldConfig];
      if (value) {
        result[key as keyof FieldConfig] = parseInt(value.toString());
      }
    }

    return result;
  }

  createNewGame(): void {
    this.game = new MinesweeperGameModel(getOwner(this), this.modifiedConfig);
  }

  updateField(x = 0): void {
    if (!this.game) return;
    const max = x ? x + 1 : this.game.configuration.width;

    for (x; x < max; x++) {
      this.game.field[x] = [ ...this.game.field[x] ];
      this.game.field = [ ...this.game.field ];
    }
  }

  findMines(x: number, y: number): void {
    const resultCell = this.game?.field[x]?.[y];

    if (!this.game || !resultCell || resultCell.revealed) return;
  
    let count = 0;

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (this.game.field[x + i]?.[y - j]) {
          if (this.game.field[x + i][y - j].mine) {
            count = count + 1;
          }
        }
      }
    }

    resultCell.revealed = true;

    if (count) {
      resultCell.hint = count;
    } else {
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          this.findMines(x + i, y - j);
        }
      }
    }
  }

  checkCell(x: number, y: number): void {
    const cell = this.game?.field[x][y];

    if (!cell || this.isEnded || cell.revealed || cell.marked) return;
    
    if (cell.mine) {
      cell.revealed = true;
    } else {
      this.findMines(x, y);
    }
  }

  @action
  startNewGame(): void {
    this.state = STATE.CONFIG;
  }

  @action
  launchGame(): void {
    this.state = STATE.GAME;
    this.createNewGame();
  }

  @action
  exitGame(): void {
    this.state = STATE.INIT;
    this.configuration = {};
  }

  @action
  clickCell(x: number, y: number): void {
    this.checkCell(x, y);
    this.updateField();
  }

  @action
  markCell(x: number, y: number, event: PointerEvent): void {
    const cell = this.game?.field[x][y];

    if (!this.game || !cell || this.isEnded || cell.revealed) return;

    event.preventDefault();

    cell.marked = cell.marked ? false : true;
    this.updateField(x);
  }
} 
