"use client";

import { useState } from "react";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setRecipe("");
    setError("");

    try {
      const res = await fetch("/api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        setError(error || "Something went wrong.");
        return;
      }

      const data = await res.json();
      setRecipe(data.recipe);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto mt-10 p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">AI Recipe Generator</h1>

      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className="w-full p-2 bg-zinc-800 border border-gray-500 rounded mb-4 text-white placeholder-gray-400"
        placeholder="Enter ingredients, separated by commas..."
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Recipe"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {recipe && (
        <div className="mt-6 p-4 border rounded bg-gray-800 text-blue-100 whitespace-pre-wrap">
          {recipe}
        </div>
      )}
    </main>
  );
}
