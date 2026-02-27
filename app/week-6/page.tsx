"use client";
import { useState } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";

import itemsData from "./items.json";

type ItemObject = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

type NewItemData = Omit<ItemObject, "id">;

export default function Page() {
  const [items, setItems] = useState(itemsData);

  function handleAddItem(newItem: NewItemData) {
    const newItemWithId = { ...newItem, id: crypto.randomUUID() };
    setItems((prevItems) => [...prevItems, newItemWithId]);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <NewItem onAddItem={handleAddItem} />
      <h1 className="text-3xl font-bold mb-6">Shopping List</h1>
      <ItemList items={items} />
    </div>
  );
}
