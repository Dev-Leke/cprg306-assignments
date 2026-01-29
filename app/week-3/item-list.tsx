import Item from "./item";

type ItemObject = {
  name: string;
  quantity: number;
  category: string;
};

type ItemListProps = {
  items: ItemObject[];
};

export default function ItemList({ items }: ItemListProps) {
  return (
    <ul className="grid grid-cols-4 gap-4">
      {items.map((item) => (
        <Item item={item} key={item.name} />
      ))}
    </ul>
  );
}
