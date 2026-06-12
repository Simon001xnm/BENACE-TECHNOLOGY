'use server';
/**
 * @fileOverview A Genkit flow for AI-powered image editing and enhancement.
 * Specifically optimized for product cleanup and background removal.
 *
 * - editProductImage - A function that handles image-to-image generation.
 * - EditImageInput - The input type for the editProductImage function.
 * - EditImageOutput - The return type for the editProductImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const EditImageInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "The source image as a data URI that must include a MIME type and use Base64 encoding."
    ),
  prompt: z.string().describe('The description of the changes or enhancements to make to the image.'),
});
export type EditImageInput = z.infer<typeof EditImageInputSchema>;

const EditImageOutputSchema = z.object({
  editedImageDataUri: z.string().describe('The resulting edited image as a data URI.'),
});
export type EditImageOutput = z.infer<typeof EditImageOutputSchema>;

export async function editProductImage(input: EditImageInput): Promise<EditImageOutput> {
  return editImageFlow(input);
}

const editImageFlow = ai.defineFlow(
  {
    name: 'editImageFlow',
    inputSchema: EditImageInputSchema,
    outputSchema: EditImageOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-image',
      prompt: [
        { media: { url: input.imageDataUri } },
        { text: input.prompt },
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media) {
      throw new Error('No edited image was returned from the model.');
    }

    return {
      editedImageDataUri: media.url,
    };
  }
);
