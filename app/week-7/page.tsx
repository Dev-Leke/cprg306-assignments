"use client";
import { useState } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";

import itemsData from "./items.json";
import MealIdeas from "./meal-ideas";

type ItemObject = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

type NewItemData = Omit<ItemObject, "id">;

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState<string | null>(null);

  function handleAddItem(newItem: NewItemData) {
    const newItemWithId = { ...newItem, id: crypto.randomUUID() };
    setItems((prevItems) => [...prevItems, newItemWithId]);
  }

  function handleItemSelect(itemName: string) {
    const cleanedName = itemName
      .split(",")[0]
      .replace(/[^\w\s]/gi, "")
      .trim();
    setSelectedItemName(cleanedName);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Shopping List</h1>

      <div className="flex gap-10 max-w-7xl mx-auto">
        <div className="w-1/2 space-y-6">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onSelectItem={handleItemSelect} />
        </div>

        <div className="w-1/2">
          {selectedItemName ? (
            <MealIdeas ingredient={selectedItemName} />
          ) : (
            <p className="text-gray-500 text-lg">
              Select an item to see meal ideas.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
