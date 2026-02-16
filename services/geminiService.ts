
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const generateSingleEmoji = async (
  base64Image: string,
  expression: string
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  // Using gemini-2.5-flash-image for image manipulation/generation
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Image.split(',')[1],
            mimeType: 'image/png',
          },
        },
        {
          text: `Transform the face in this photo into a cute 2D digital emoji sticker with the expression: "${expression}". 
          The style should be a consistent, clean, high-quality vector illustration style, similar to KakaoTalk or LINE stickers. 
          Focus on the head and face. Clear white background. Simplified features.`,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("Failed to generate image from AI response");
};
