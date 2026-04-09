import type { Item } from './items';

export interface TodoItemProps {
  item: Item;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
  onInComplete: (id: string) => void;
}
