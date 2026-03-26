"use client";

import { useState } from "react";
type ItemObject = {
  name: string;
  quantity: number;
  category: string;
};

interface NewItemProps {
  onAddItem: (item: ItemObject) => void;
}

export default function NewItem({ onAddItem }: NewItemProps) {
  const [itemDetails, setItemDetails] = useState({
    name: "",
    quantity: 1,
    category: "Produce",
  });

  const [nameTouched, setNameTouched] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!itemDetails.name || itemDetails.name.length < 2) return;

    onAddItem({ ...itemDetails });

    setItemDetails({
      name: "",
      quantity: 1,
      category: "Produce",
    });

    setNameTouched(false);
  }

  const isNameValid = itemDetails.name.length >= 2;

  return (
    <div className="w-full max-w-3xl mb-6 bg-white shadow-md rounded-xl p-4 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-3 items-start md:items-end"
      >
        {/* Name */}
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Item
          </label>
          <input
            type="text"
            value={itemDetails.name}
            placeholder="e.g. Apples"
            onChange={(e) =>
              setItemDetails({ ...itemDetails, name: e.target.value })
            }
            onBlur={() => setNameTouched(true)}
            className={`w-full rounded-lg border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2
              ${
                nameTouched && !isNameValid
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-300"
              }`}
          />
          {nameTouched && !isNameValid && (
            <p className="text-xs text-red-500 mt-1">
              Must be at least 2 characters
            </p>
          )}
        </div>

        {/* Quantity */}
        <div className="w-full md:w-28">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Qty
          </label>
          <input
            type="number"
            min="1"
            value={itemDetails.quantity}
            onChange={(e) =>
              setItemDetails({
                ...itemDetails,
                quantity: Number(e.target.value),
              })
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Category */}
        <div className="w-full md:w-44">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Category
          </label>
          <select
            value={itemDetails.category}
            onChange={(e) =>
              setItemDetails({ ...itemDetails, category: e.target.value })
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="Produce">Produce</option>
            <option value="Dairy">Dairy</option>
            <option value="Bakery">Bakery</option>
            <option value="Meat">Meat</option>
            <option value="Frozen Food">Frozen Food</option>
            <option value="Canned Goods">Canned Goods</option>
            <option value="Dry Goods">Dry Goods</option>
            <option value="Beverages">Beverages</option>
            <option value="Snacks">Snacks</option>
            <option value="Household">Household</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={!isNameValid}
          className={`w-full md:w-auto px-6 py-2 rounded-lg font-medium transition-colors
            ${
              isNameValid
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Add
        </button>
      </form>
    </div>
  );
}
