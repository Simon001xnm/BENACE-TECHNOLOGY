'use server';
/**
 * @fileOverview A Genkit flow for parsing natural language laptop search queries into structured parameters.
 *
 * - naturalLanguageLaptopSearch - A function that handles the natural language laptop search query processing.
 * - NaturalLanguageLaptopSearchInput - The input type for the naturalLanguageLaptopSearch function.
 * - NaturalLanguageLaptopSearchOutput - The return type for the naturalLanguageLaptopSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NaturalLanguageLaptopSearchInputSchema = z.object({
  query: z.string().describe('The natural language query for laptop search, e.g., "Show me business laptops under KSH 150000 with at least 512GB SSD".'),
});
export type NaturalLanguageLaptopSearchInput = z.infer<typeof NaturalLanguageLaptopSearchInputSchema>;

const NaturalLanguageLaptopSearchOutputSchema = z.object({
  minPrice: z.number().optional().describe('Minimum price for the laptop.'),
  maxPrice: z.number().optional().describe('Maximum price for the laptop.'),
  minStorageGB: z.number().optional().describe('Minimum storage in GB (e.g., 256, 512, 1000).'),
  minRamGB: z.number().optional().describe('Minimum RAM in GB (e.g., 8, 16, 32).'),
  processor: z.string().optional().describe('Specific processor type or family (e.g., "Intel i7", "AMD Ryzen 5").'),
  laptopType: z.enum(['business', 'gaming', 'ultrabook', '2-in-1', 'chromebook', 'student', 'general-purpose', 'workstation', 'creator', 'thin-and-light']).optional().describe('Type of laptop.'),
  brands: z.array(z.string()).optional().describe('List of preferred laptop brands (e.g., "Dell", "HP", "Apple").'),
  minScreenSizeInches: z.number().optional().describe('Minimum screen size in inches.'),
  maxScreenSizeInches: z.number().optional().describe('Maximum screen size in inches.'),
  graphicsCard: z.string().optional().describe('Specific graphics card or family (e.g., "NVIDIA RTX 3060", "AMD Radeon").'),
  operatingSystem: z.enum(['Windows', 'macOS', 'ChromeOS', 'Linux']).optional().describe('Preferred operating system.'),
  features: z.array(z.string()).optional().describe('List of desired features (e.g., "touchscreen", "backlit keyboard", "fingerprint reader").'),
});
export type NaturalLanguageLaptopSearchOutput = z.infer<typeof NaturalLanguageLaptopSearchOutputSchema>;

export async function naturalLanguageLaptopSearch(input: NaturalLanguageLaptopSearchInput): Promise<NaturalLanguageLaptopSearchOutput> {
  return naturalLanguageLaptopSearchFlow(input);
}

const naturalLanguageLaptopSearchPrompt = ai.definePrompt({
  name: 'naturalLanguageLaptopSearchPrompt',
  input: { schema: NaturalLanguageLaptopSearchInputSchema },
  output: { schema: NaturalLanguageLaptopSearchOutputSchema },
  prompt: `You are an intelligent assistant designed to extract laptop search parameters from natural language queries.
Your goal is to parse the user's query and output a JSON object containing relevant laptop specifications.
If a parameter is not explicitly mentioned, omit it from the output.

Here are the available laptop types: business, gaming, ultrabook, 2-in-1, chromebook, student, general-purpose, workstation, creator, thin-and-light.
Here are the available operating systems: Windows, macOS, ChromeOS, Linux.

Example Query: "Show me business laptops under KSH 150000 with at least 512GB SSD and 16GB RAM, preferably from Dell or HP."
Expected Output:
{{"maxPrice": 150000, "minStorageGB": 512, "minRamGB": 16, "laptopType": "business", "brands": ["Dell", "HP"]}}

Example Query: "I need a gaming laptop with an RTX 4070 and a 17-inch screen"
Expected Output:
{{"laptopType": "gaming", "graphicsCard": "RTX 4070", "minScreenSizeInches": 17}}

Example Query: "Affordable ultrabook"
Expected Output:
{{"laptopType": "ultrabook", "maxPrice": 120000}} (assuming affordable implies a maximum price)

Example Query: "Laptop with touchscreen and long battery life"
Expected Output:
{{"features": ["touchscreen", "long battery life"]}}

Now, analyze the following query:
Query: {{{query}}}`,
});

const naturalLanguageLaptopSearchFlow = ai.defineFlow(
  {
    name: 'naturalLanguageLaptopSearchFlow',
    inputSchema: NaturalLanguageLaptopSearchInputSchema,
    outputSchema: NaturalLanguageLaptopSearchOutputSchema,
  },
  async (input) => {
    const {output} = await naturalLanguageLaptopSearchPrompt(input);
    return output!;
  }
);
