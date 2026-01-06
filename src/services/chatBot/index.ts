import { GoogleGenAI } from '@google/genai';
import createError from 'http-errors';

const genAI = new GoogleGenAI({
  apiKey: `${process.env.GOOGLE_AI_API_KEY}`,
});

export const generateResponse = async (prompt: string) => {
  try {
    const res = await genAI.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: process.env.CHATBOT_SYSTEM_INSTRUCTION,
      },
    });

    const content = res.candidates?.[0]?.content;
    if (content?.parts?.length && content.parts[0].text) {
      return { response: content.parts[0].text };
    }

    return { response: 'No response generated.' };
  } catch (error) {
    throw createError(500, `Failed to generate response: ${error}`);
  }
};
