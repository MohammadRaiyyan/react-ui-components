import type { RecipeResponse } from "./types";

export async function fetchRecipies(signal: AbortSignal, searchTerm: string) {
  const response = await fetch(
    `https://dummyjson.com/recipes/search?${new URLSearchParams({
      q: searchTerm || "",
      limit: "10",
    })}`,
    { signal },
  );
  const data = (await response.json()) as Promise<RecipeResponse>;
  return data;
}
