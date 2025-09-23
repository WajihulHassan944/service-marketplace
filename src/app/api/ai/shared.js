import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

const SYSTEM_PROMPT = `You are an expert project scoping assistant for a services marketplace.
Given structured details from a buyer conversation and optional candidate suggestions, produce a concise JSON summary that helps match them with the right talent.
Always return valid JSON with the following fields:
- projectOverview: string
- keyNeeds: array of 3 short bullet strings highlighting the most important requirements.
- idealExpertProfile: string describing the type of talent that should respond.
- nextSteps: array of up to 3 actionable suggestions.
- tags: array of short lowercase tags (kebab-case) sized 3-6 items.
Ensure the JSON is minified (single line) and does not include markdown or code fences.`;

const CHAT_SYSTEM_PROMPT = `You are an AI guide helping buyers describe the work they need on a services marketplace.
Ask natural, conversational follow-up questions to pin down project scope, goals, timeline, budget, success criteria, and any must-have constraints.
Respond in JSON with fields: reply (string with the assistant message) and summaryReady (boolean). Set summaryReady to true only when the buyer has clearly provided enough detail for a project brief, or when the buyer explicitly asks for a summary. Keep replies friendly, concise, and reference the buyer's words. Never include markdown or code fences.`;

const ensureApiKey = () => {
  if (!process.env.OPENAI_API_KEY) {
    const error = new Error('Missing OpenAI API key.');
    error.status = 500;
    throw error;
  }
};

const safeParseJson = (raw, label) => {
  if (typeof raw !== 'string') return null;

  const trimmed = raw.trim();
  console.log(`[${label}] Raw model output:`, trimmed || '<empty>');

  try {
    const parsed = JSON.parse(trimmed);
    console.log(`[${label}] Parsed JSON successfully.`);
    return parsed;
  } catch (primaryError) {
    console.warn(`[${label}] Primary JSON parse failed:`, primaryError.message);
    const firstBrace = trimmed.indexOf('{');
    const lastBrace = trimmed.lastIndexOf('}');

    if (firstBrace === -1 || lastBrace <= firstBrace) {
      console.warn(`[${label}] Could not locate JSON object in response.`);
      return null;
    }

    try {
      const parsed = JSON.parse(trimmed.slice(firstBrace, lastBrace + 1));
      console.log(`[${label}] Parsed JSON successfully after trimming extraneous text.`);
      return parsed;
    } catch (secondaryError) {
      console.warn(`[${label}] Secondary JSON parse failed:`, secondaryError.message);
      return null;
    }
  }
};

const buildBriefPrompt = ({ searchTerm, answers = {}, conversation = [], suggestions = [] }) => {
  const payload = {
    searchTerm,
    answers,
    conversation,
    suggestions: suggestions.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      price: item.price,
      seller: item.seller,
    })),
  };

  return `BUYER INPUT:\n${JSON.stringify(payload, null, 2)}\n\nRespond with JSON:`;
};

const formatHistory = (history = []) => {
  if (!Array.isArray(history)) return '';

  return history
    .map((message) => {
      if (!message || typeof message !== 'object') return '';
      const role = message.role === 'user' ? 'Buyer' : 'Assistant';
      return `${role}: ${message.content || ''}`;
    })
    .filter(Boolean)
    .join('\n');
};

const buildChatPrompt = ({ searchTerm, history = [] }) => {
  const historyBlock = formatHistory(history);

  return [
    searchTerm ? `Search term: ${searchTerm}` : null,
    'Conversation so far:',
    historyBlock || 'None yet.',
    '',
    'Respond with JSON:'.trim(),
  ]
    .filter(Boolean)
    .join('\n');
};

export const generateBrief = async ({ searchTerm = '', answers = {}, conversation = [], suggestions = [] }) => {
  ensureApiKey();

  const hasAnswers = Object.keys(answers || {}).length > 0;
  const hasConversation = Array.isArray(conversation) && conversation.length > 0;

  if (!searchTerm && !hasAnswers && !hasConversation) {
    const error = new Error('Provide at least a search term or conversation history for context.');
    error.status = 400;
    throw error;
  }

  console.log('[AI_BRIEF] Generating brief with payload:', {
    searchTerm,
    answers,
    conversation,
    suggestions,
  });

  const result = await generateText({
    model: openai('gpt-4o-mini'),
    system: SYSTEM_PROMPT,
    prompt: buildBriefPrompt({ searchTerm, answers, conversation, suggestions }),
    temperature: 0.6,
    maxOutputTokens: 600,
  });

  const parsed = safeParseJson(result.text, 'AI_BRIEF');

  if (!parsed) {
    const error = new Error('AI response was not valid JSON.');
    error.status = 502;
    error.raw = result.text;
    throw error;
  }

  return parsed;
};

export const chatTurn = async ({ searchTerm = '', history = [] }) => {
  ensureApiKey();

  console.log('[AI_CHAT] Generating chat turn with payload:', { searchTerm, history });

  const prompt = buildChatPrompt({ searchTerm, history });

  const result = await generateText({
    model: openai('gpt-4o-mini'),
    system: CHAT_SYSTEM_PROMPT,
    prompt,
    temperature: 0.7,
    maxOutputTokens: 400,
  });

  const parsed = safeParseJson(result.text, 'AI_CHAT');

  if (!parsed) {
    const error = new Error('AI response was not valid JSON.');
    error.status = 502;
    error.raw = result.text;
    throw error;
  }

  const reply = typeof parsed.reply === 'string' ? parsed.reply.trim() : '';
  const summaryReady = Boolean(parsed.summaryReady);

  if (!reply) {
    const error = new Error('AI response did not include a reply.');
    error.status = 502;
    error.raw = parsed;
    throw error;
  }

  return { reply, summaryReady };
};
