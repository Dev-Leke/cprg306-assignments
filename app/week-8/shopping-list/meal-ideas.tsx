"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

type Meal = { idMeal: string; strMeal: string; strMealThumb: string };

async function fetchMealIdeas(ingredient: string): Promise<Meal[]> {
  try {
    const ideas = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
    );
    const data = await ideas.json();
    console.log(data);
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meal ideas:", error);
    return [];
  }
}

function MealIdeas({ ingredient }: { ingredient: string }) {
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    async function getMeals() {
      const mealIdeas = await fetchMealIdeas(ingredient);
      setMeals(mealIdeas);
    }
    getMeals();
  }, [ingredient]);

  console.log(meals);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Meal Ideas for <span className="text-green-600">{ingredient}</span>
      </h1>
      {meals.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {meals.map((meal) => (
            <li
              key={meal.idMeal}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              <Image
                src={meal.strMealThumb}
                alt={meal.strMeal}
                width={300}
                height={300}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <p className="font-semibold text-gray-800 text-lg">
                  {meal.strMeal}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">
          There are no meal ideas available for this ingredient.
        </p>
      )}
    </div>
  );
}

export default MealIdeas;
