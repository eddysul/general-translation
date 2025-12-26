/**
 * API route for JSON translation.
 * Translates all string values in JSON while preserving structure and keys.
 */

import { NextRequest, NextResponse } from 'next/server';
import { translateText } from '@/lib/ai/translateText';
import { translateJson } from '@/lib/json/translateJson';
import type { JsonTranslationRequest, ErrorResponse } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: JsonTranslationRequest = await request.json();

    const { json, sourceLanguage, targetLanguage, provider } = body;

    // Validation
    if (!json || !sourceLanguage || !targetLanguage || !provider) {
      return NextResponse.json(
        { error: 'Missing required fields: json, sourceLanguage, targetLanguage, provider' } as ErrorResponse,
        { status: 400 }
      );
    }

    if (json.trim().length === 0) {
      return NextResponse.json(
        { error: 'JSON cannot be empty' } as ErrorResponse,
        { status: 400 }
      );
    }

    // Translate JSON: recursively translate all string values
    const translatedJson = await translateJson(
      json,
      // Inline translation function for each string value
      async (text) => {
        return await translateText(text, sourceLanguage, targetLanguage, provider);
      }
    );

    return NextResponse.json({
      translatedJson,
      sourceLanguage,
      targetLanguage,
      provider,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      {
        error: 'JSON translation failed',
        details: errorMessage,
      } as ErrorResponse,
      { status: 500 }
    );
  }
}
