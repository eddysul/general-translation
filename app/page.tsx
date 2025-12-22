'use client';

import { useState, useEffect } from 'react';
import TextTranslator from './components/TextTranslator';
import type { Provider } from '@/lib/types';

export default function TranslationPage() {
  const [provider, setProvider] = useState<Provider>('openai');
  const [isJsonMode, setIsJsonMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
    const savedProvider = localStorage.getItem('translatorProvider') as Provider | null;
    if (savedProvider) {
      setProvider(savedProvider);
    }
  }, []);

  const handleProviderChange = (newProvider: Provider) => {
    setProvider(newProvider);
    localStorage.setItem('translatorProvider', newProvider);
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-800/50 backdrop-blur py-5 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              GT <span className="text-blue-400">Translate</span>
            </h1>
            <p className="text-sm text-gray-400 mt-1">Powered by AI</p>
          </div>
          <div className="flex gap-6 items-center">
            {/* Provider Selector */}
            <div className="flex items-center gap-3 bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => handleProviderChange('openai')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  provider === 'openai'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                OpenAI
              </button>
              <button
                onClick={() => handleProviderChange('anthropic')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  provider === 'anthropic'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Anthropic
              </button>
            </div>

            {/* JSON Mode Toggle */}
            <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={isJsonMode}
                onChange={() => setIsJsonMode(!isJsonMode)}
                className="w-4 h-4 rounded accent-blue-500"
              />
              <span className="text-sm font-medium">JSON Mode</span>
            </label>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Mode Indicator */}
        <div className="mb-6 text-sm text-gray-400">
          {isJsonMode ? (
            <span>📄 JSON Translation Mode</span>
          ) : (
            <span>✨ Text Translation Mode</span>
          )}
        </div>

        {/* Translator Component */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 shadow-2xl">
          {!isJsonMode ? (
            <TextTranslator provider={provider} />
          ) : (
            <div className="text-center py-12 text-gray-400">
              <p className="mb-4">JSON mode coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}