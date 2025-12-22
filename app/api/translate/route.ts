/**
 * API route for text translation
 */

import { NextRequest, NextResponse } from 'next/server';
import { translateText } from '@/lib/ai/translateText';
import type { TranslationRequest, TranslationResponse, ErrorResponse } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: TranslationRequest = await request.json();

    const { text, sourceLanguage, targetLanguage, provider } = body;

    // Validation
    if (!text || !sourceLanguage || !targetLanguage || !provider) {
      return NextResponse.json(
        { error: 'Missing required fields: text, sourceLanguage, targetLanguage, provider' } as ErrorResponse,
        { status: 400 }
      );
    }

    if (text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text cannot be empty' } as ErrorResponse,
        { status: 400 }
      );
    }

    const translatedText = await translateText(text, sourceLanguage, targetLanguage, provider);

    const response: TranslationResponse = {
      translatedText,
      sourceLanguage,
      targetLanguage,
      provider,
    };

    return NextResponse.json(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      {
        error: 'Translation failed',
        details: errorMessage,
      } as ErrorResponse,
      { status: 500 }
    );
  }
}
