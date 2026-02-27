"use client";

import { useState } from "react";
import Item from "./item";

type ItemObject = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

type ItemListProps = {
  items: ItemObject[];
};

export default function ItemList({ items }: ItemListProps) {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }

    return 0;
  });

  const groupedItems = items.reduce(
    (groups, item) => {
      const category =
        item.category.charAt(0).toUpperCase() + item.category.slice(1);

      if (!groups[category]) {
        groups[category] = [];
      }

      groups[category].push(item);

      return groups;
    },
    {} as Record<string, ItemObject[]>,
  );

  return (
    <div>
      {sortBy === "group" ? (
        Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="mb-6">
            <h2 className="text-xl font-semibold mb-3">{category}</h2>

            <ul className="grid grid-cols-4 gap-4">
              {items.map((item) => (
                <Item key={item.id} item={item} />
              ))}
            </ul>
          </div>
        ))
      ) : (
        <ul className="grid grid-cols-4 gap-4">
          {sortedItems.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </ul>
      )}
      <div className="mt-6 flex gap-4 justify-center">
        <button
          onClick={() => setSortBy("name")}
          className={`px-5 py-2 rounded-xl font-medium transition
      ${
        sortBy === "name"
          ? "bg-blue-600 text-white"
          : "bg-gray-100 hover:bg-gray-200"
      }
    `}
        >
          Sort By Name
        </button>

        <button
          onClick={() => setSortBy("category")}
          className={`px-5 py-2 rounded-xl font-medium transition
      ${
        sortBy === "category"
          ? "bg-blue-600 text-white"
          : "bg-gray-100 hover:bg-gray-200"
      }
    `}
        >
          Sort By Category
        </button>

        <button
          onClick={() => setSortBy("group")}
          className={`px-5 py-2 rounded-xl font-medium transition
      ${
        sortBy === "group"
          ? "bg-blue-600 text-white"
          : "bg-gray-100 hover:bg-gray-200"
      }
    `}
        >
          Group By Category
        </button>
      </div>
    </div>
  );
}
