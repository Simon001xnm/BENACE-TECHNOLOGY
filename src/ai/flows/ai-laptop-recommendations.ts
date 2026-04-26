'use server';
/**
 * @fileOverview An AI agent for recommending laptops based on user preferences and browsing history.
 *
 * - aiLaptopRecommendations - A function that handles the laptop recommendation process.
 * - AiLaptopRecommendationsInput - The input type for the aiLaptopRecommendations function.
 * - AiLaptopRecommendationsOutput - The return type for the aiLaptopRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiLaptopRecommendationsInputSchema = z.object({
  browsingHistory: z
    .array(z.string())
    .describe(
      'A list of previously viewed laptop models or categories by the user.'
    ),
  preferences: z
    .string()
    .describe('User-specified preferences for laptop recommendations.'),
});
export type AiLaptopRecommendationsInput = z.infer<
  typeof AiLaptopRecommendationsInputSchema
>;

const AiLaptopRecommendationsOutputSchema = z.object({
  recommendedLaptops: z
    .array(
      z.object({
        name: z.string().describe('The name of the recommended laptop.'),
        brand: z.string().describe('The brand of the recommended laptop.'),
        price: z.string().describe('The price of the recommended laptop.'),
        specifications: z
          .string()
          .describe('Key specifications of the recommended laptop.'),
        reason: z
          .string()
          .describe('A brief explanation why this laptop is recommended.'),
      })
    )
    .describe('An array of recommended laptops.'),
});
export type AiLaptopRecommendationsOutput = z.infer<
  typeof AiLaptopRecommendationsOutputSchema
>;

export async function aiLaptopRecommendations(
  input: AiLaptopRecommendationsInput
): Promise<AiLaptopRecommendationsOutput> {
  return aiLaptopRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiLaptopRecommendationsPrompt',
  input: {schema: AiLaptopRecommendationsInputSchema},
  output: {schema: AiLaptopRecommendationsOutputSchema},
  prompt: `You are an expert laptop sales assistant.

Your task is to recommend laptops to the user based on their browsing history and stated preferences.
Provide at least 3, but no more than 5, distinct laptop recommendations.
For each recommendation, include the laptop's name, brand, price, key specifications, and a brief reason why it matches the user's needs.

User's browsing history: {{{browsingHistory}}}
User's preferences: {{{preferences}}}
`,
});

const aiLaptopRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiLaptopRecommendationsFlow',
    inputSchema: AiLaptopRecommendationsInputSchema,
    outputSchema: AiLaptopRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
