import { Injectable } from '@angular/core';
import { ActionType } from '../models/ActionType';

@Injectable()
export class ActionTypeService {

  constructor() { }

  getItems(): string[] {
    return Object.keys(ActionType);
  }

  getNames(): string[] {
    const items = this.getItems();
    return items.slice(items.length / 2);
  }

  getValues(): string[] {
    const items = this.getItems();
    return items.slice(0, items.length / 2);
  }

  getMapByName(): { [key: string]: string } {
    const itemsMap: { [key: string]: string } = {};

    const itemsNames = this.getNames();
    const itemsValues = this.getValues();

    for (let i = 0; i < itemsNames.length; i++) {
      const itemName = itemsNames[i];
      const itemValue = itemsValues[i];

      itemsMap[itemName] = itemValue;
    }

    return itemsMap;
  }

  getMapByValue(): { [key: string]: string } {
    const itemsMap: { [key: string]: string } = {};

    const itemsNames = this.getNames();
    const itemsValues = this.getValues();

    for (let i = 0; i < itemsNames.length; i++) {
      const itemName = itemsNames[i];
      const itemValue = itemsValues[i];

      itemsMap[itemValue] = itemName;
    }

    return itemsMap;
  }

  getArray(): { value: string, name: string }[] {
    const itemsArray: { value: string, name: string }[] = [];

    const itemsNames = this.getNames();
    const itemsValues = this.getValues();

    for (let i = 0; i < itemsNames.length; i++) {
      const itemName = itemsNames[i];
      const itemValue = itemsValues[i];

      itemsArray.push({ value: itemValue, name: itemName });
    }

    return itemsArray;
  }
}
