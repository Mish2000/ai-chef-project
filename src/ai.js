import { HfInference } from '@huggingface/inference';

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients
and suggests a recipe they could make with some or all of those ingredients.
You don't need to use every ingredient mentioned. The recipe may include
additional ingredients, but try not to add too many extras.
Format your response in markdown.
`;

const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN);

export async function getRecipeFromLLM(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");

    const messages = [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` }
    ];

    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: messages,
            max_tokens: 1024,
        });

        return response.choices[0].message.content;
    } catch (err) {
        console.error("Error in getRecipeFromLLM:", err.message);
        return "";
    }
}

