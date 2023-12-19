import { PromptTemplate } from "langchain/prompts";
import { RunnableSequence } from "langchain/schema/runnable";
import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

const prompt = PromptTemplate.fromTemplate(
    `
    You are AI Assistant. AI Assistant is qualified in understanding transcript of a meeting in different languages.
    AI Assistant is hired by a client to understand the transcript of a meeting and provide a 
    `
)