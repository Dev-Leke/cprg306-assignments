"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context";
import { getItems, addItem } from "../_services/shopping-list-service";
type ItemObject = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

type NewItemData = Omit<ItemObject, "id">;

export default function Page() {
  const { user } = useUserAuth();
  const router = useRouter();
  const [items, setItems] = useState<ItemObject[]>([]);
  const [selectedItemName, setSelectedItemName] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.replace("/week-8");
    }
  }, [user, router]);

  useEffect(() => {
    const loadItems = async () => {
      if (user) {
        const data = await getItems(user.uid);
        setItems(data);
      }
    };
    loadItems();
  }, [user]);

  async function handleAddItem(newItem: NewItemData) {
    console.log(user);
    if (user) {
      const id = await addItem(user.uid, newItem);
      setItems((prev) => [...prev, { id, ...newItem }]);
    }
  }

  function handleItemSelect(itemName: string) {
    const cleanedName = itemName
      .split(",")[0]
      .replace(/[^\w\s]/gi, "")
      .trim();
    setSelectedItemName(cleanedName);
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 animate-pulse">
        Redirecting...
      </div>
    );
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
