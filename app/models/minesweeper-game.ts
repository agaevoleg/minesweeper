import Owner from '@ember/owner';
import { setOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';

import type { Field, FieldConfig } from '../types/minesweeper';
import { DEFAULT_CELL, DEFAULT_CONFIG } from '../constants';

interface Coordinate {
  x: number;
  y: number;
}

export default class MinesweeperGameModel {
  configuration = DEFAULT_CONFIG;
  @tracked field: Field = [];

  constructor(owner: Owner, configuration: FieldConfig) {
    setOwner(this, owner);
    this.configuration =  { ...DEFAULT_CONFIG, ...configuration };

    this.field = this.generatedField(); 
  }

  generatedField(): Field {
    const field = Array.from(
      {length : this.configuration.width}, () => Array.from({length : this.configuration.height}, () => { return {...DEFAULT_CELL }})
    );

    const mines: Coordinate[] = this.generatedMinesNumbers().map(number => {
      return { x: Math.floor(number / this.configuration.width), y: number % this.configuration.width};
    });

    mines.forEach(coordinate => {
      field[coordinate.x][coordinate.y].mine = true;
    });

    return field;
  }

  generatedMinesNumbers(): number[] {
    const min = 0;
    const max = (this.configuration.width * this.configuration.height) - 1;
    const array: number[] = [];
    
    while (array.length < this.configuration.mines) {
      const number = Math.floor(Math.random() * (max - min + 1) + min);
      if (!array.includes(number)) {
        array.push(number);
      }
    }

    return array;
  }
}
