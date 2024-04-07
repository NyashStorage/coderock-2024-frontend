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

/**
 * @returns TailwindCSS класс или пустая строка
 */
export function getDirection(direction?: Direction): string {
  return getOrDefault(directions, direction);
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

/**
 * @returns TailwindCSS класс или пустая строка
 */
export function getJustification(
  justification?: Justification,
): string | undefined {
  return getOrDefault(justifications, justification);
}

// align-items
export type ItemsAlignment = 'center';

const itemsAlignments = new Map<ItemsAlignment, string>(
  Object.entries({
    center: 'items-center',
  } as Record<ItemsAlignment, string>) as Iterable<[ItemsAlignment, string]>,
);

/**
 * @returns TailwindCSS класс или пустая строка
 */
export function getItemsAlignment(
  itemsAlignment?: ItemsAlignment,
): string | undefined {
  return getOrDefault(itemsAlignments, itemsAlignment);
}

// Утилиты
/**
 * Получает класс из словаря или возвращает пустую строку.
 */
function getOrDefault<T>(map: Map<T, string>, item: T | undefined): string {
  return item ? map.get(item)! : '';
}
