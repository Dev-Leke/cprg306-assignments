type ItemObject = {
  name: string;
  quantity: number;
  category: string;
};

type ItemObjectProps = {
  item: ItemObject;
};

export default function Item({
  item,
  onSelect,
}: ItemObjectProps & { onSelect: (name: string) => void }) {
  const { name, quantity, category } = item;
  return (
    <ul
      onClick={() => onSelect(name)}
      className="flex items-center p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow pointer-events-auto cursor-pointer"
    >
      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold mr-4">
        🛒
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600">{quantity}</p>
        <p className="text-gray-500 text-sm">{category}</p>
      </div>
    </ul>
  );
}
