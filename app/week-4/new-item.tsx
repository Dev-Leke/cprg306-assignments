"use client";

import { useState } from "react";

export default function NewItem() {
  const [itemDetails, setItemDetails] = useState({
    name: "",
    quantity: 1,
    category: "Produce",
  });

  const [nameTouched, setNameTouched] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newItem = { ...itemDetails };
    if (!itemDetails.name || itemDetails.name.length < 2) {
      alert(
        "Item name field cannot be empty and must be at least 2 characters",
      );
    } else {
      alert(
        `Name: ${newItem.name}\nQuantity: ${newItem.quantity}\nCategory: ${newItem.category}`,
      );
    }

    setItemDetails({
      name: "",
      quantity: 1,
      category: "Produce",
    });

    setNameTouched(false);
  }

  const isNameValid = itemDetails.name.length >= 2;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create New Item
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item name
            </label>
            <input
              type="text"
              value={itemDetails.name}
              placeholder="e.g. Apples"
              onChange={(e) =>
                setItemDetails({ ...itemDetails, name: e.target.value })
              }
              onBlur={() => setNameTouched(true)}
              onFocus={() => setNameTouched(false)}
              className={`w-full rounded-lg border px-3 py-2 text-gray-800
                ${
                  nameTouched && !isNameValid
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-300"
                }`}
            />
            {nameTouched && !isNameValid && (
              <p className="mt-1 text-sm text-red-500">
                Item name is required - must be longer than 2 characters
              </p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
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
              className="w-full rounded-lg border border-gray-300 px-3 py-2
                text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={itemDetails.category}
              onChange={(e) =>
                setItemDetails({ ...itemDetails, category: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2
                text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
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
              <option value="HouseHold">Household</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={!isNameValid}
            className={`w-full py-2 rounded-lg font-medium transition-colors
    ${
      isNameValid
        ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400"
        : "bg-gray-400 text-gray-200 cursor-not-allowed"
    }
    focus:outline-none focus:ring-2`}
          >
            Add item
          </button>
        </form>
      </div>
    </div>
  );
}
