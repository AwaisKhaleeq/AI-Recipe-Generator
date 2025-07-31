// lib/generateRecipe.ts
export const generateRecipe = async (ingredients: string[]) => {
  const apiKey = process.env.OPENROUTER_API_KEY;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': 'http://localhost:3000', // Set this to your actual domain if deploying
      'X-Title': 'AI Recipe Generator',
    },
    body: JSON.stringify({
      model: 'openai/gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful chef who generates creative recipes.',
        },
        {
          role: 'user',
          content: `Generate a recipe using only these ingredients: ${ingredients.join(', ')}.`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text(); // 🔍 Important to debug
    throw new Error(`Failed to generate recipe: ${text}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content;
};
