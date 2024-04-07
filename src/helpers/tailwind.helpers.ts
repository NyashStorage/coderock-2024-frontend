// flex-direction
export type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse';

const directions = new Map<Direction, string>(
  Object.entries({
    row: 'flex-row',
    'row-reverse': 'flex-row-reverse',
    column: 'flex-col',
    'column-reverse': 'flex-col-reverse',
  } as Record<Direction, string>) as Iterable<[Direction, string]>,
);

export function getDirection(direction: Direction): string | undefined {
  return directions.get(direction);
}

// justify-content
export type Justification = 'center' | 'between' | 'around' | 'evenly';

const justifications = new Map<Justification, string>(
  Object.entries({
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  } as Record<Justification, string>) as Iterable<[Justification, string]>,
);

export function getJustification(
  justification: Justification,
): string | undefined {
  return justifications.get(justification);
}

// align-items
export type ItemsAlignment = 'center';

const itemsAlignments = new Map<ItemsAlignment, string>(
  Object.entries({
    center: 'items-center',
  } as Record<ItemsAlignment, string>) as Iterable<[ItemsAlignment, string]>,
);

export function getItemsAlignment(
  itemsAlignment: ItemsAlignment,
): string | undefined {
  return itemsAlignments.get(itemsAlignment);
}
