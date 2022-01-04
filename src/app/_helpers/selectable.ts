export interface Selectable<T> {
  selected: boolean;
  model: T;
}

export interface TicketSelectable {
  id: string;
  bookNumber: number;
}

export function toSelectable<T>(items: T[], preselect: boolean = false): Selectable<T>[] {
  const returnItems: Selectable<T>[] = [];
  items.forEach(item => {
    returnItems.push({
      selected: preselect,
      model: item
    } as Selectable<T>);
  });
  return returnItems;
}
