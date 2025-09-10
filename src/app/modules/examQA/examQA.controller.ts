import { Request, Response } from "express";
import { ExamQA } from "./examQA.model";
import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "../../../config";

if (!config.gemini_api_key) {
  throw new Error("Gemini API key is not defined in config.");
}
const genAI = new GoogleGenerativeAI(config.gemini_api_key);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });

export const addQA = async (req: Request, res: Response) => {
  try {
    const { userId, subject, topic } = req.body;

    const prompt = `You are an expert tutor. Generate 10 practice questions and answers for a student studying ${subject} on the topic of ${topic}.
    Provide the response strictly as a JSON array:
    [
      {"question": "Question 1?", "answer": "Answer 1"},
      {"question": "Question 2?", "answer": "Answer 2"},
      ...
    ]`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Parse AI response safely
    let qaList;
    try {
      // Remove code block markers if present
      let cleanedText = text.trim();
      if (cleanedText.startsWith("```")) {
        cleanedText = cleanedText
          .replace(/^```json\s*/i, "")
          .replace(/^```\s*/i, "")
          .replace(/```$/, "")
          .trim();
        // Remove trailing and leading triple backticks
        cleanedText = cleanedText
          .replace(/^```json\s*/i, "")
          .replace(/^```\s*/i, "")
          .replace(/```$/, "")
          .trim();
      }
      qaList = JSON.parse(cleanedText);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Failed to parse AI response", raw: text });
    }

    // Save in one document
    const qaDoc = await ExamQA.create({
      userId,
      subject,
      topic,
      questions: qaList,
    });

    res.status(201).json(qaDoc);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getQA = async (req: Request, res: Response) => {
  const { userId } = req.query;
  const qaDocs = await ExamQA.find({ userId });
  res.json(qaDocs);
};

export const getFlashcards = async (req: Request, res: Response) => {
  const { userId } = req.query;
  const flashcards = await ExamQA.find({ userId });
  res.json(flashcards);
};
