import ItemList from "./item-list";

import items from "./items.json";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6">Shopping List</h1>
      <ItemList items={items} />
    </div>
  );
}
