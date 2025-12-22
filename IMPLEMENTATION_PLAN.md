# Translation App - Implementation Plan

## Project Overview
Building a translation app with Next.js 15+ (App Router) and TypeScript that uses OpenAI and Anthropic AI models via a proxy service to translate both structured text and JSON data.

**Estimated Time:** 3-4 hours  
**Status:** Planning Phase

---

## Core Requirements Checklist

### ✅ Phase 1: Translation UI Interface
- [ ] Input field for text to translate
- [ ] Dropdown to select source language
- [ ] Dropdown to select target language
- [ ] Button to trigger translation
- [ ] Display area for translated text
- [ ] Loading states & error handling

### ✅ Phase 2: Provider Selection
- [ ] Radio buttons or dropdown to choose OpenAI or Anthropic
- [ ] Display selected provider
- [ ] Persist provider selection (localStorage)
- [ ] Easy switching between providers

### ✅ Phase 3: JSON File Support
- [ ] Text area for JSON input
- [ ] File upload functionality (bonus)
- [ ] Language selection (same as Phase 1)
- [ ] Translate all string values while preserving structure
- [ ] **NEVER** translate JSON keys
- [ ] Display translated JSON output
- [ ] Error handling for invalid JSON
- [ ] Format JSON nicely (pretty-print)

---

## Technical Stack

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** TailwindCSS
- **APIs:** OpenAI SDK, Anthropic SDK
- **Proxy:** `https://hiring-proxy.gtx.dev`

---

## Environment Setup

### .env.local
```
PROXY_TOKEN=<to-be-provided>
OPENAI_BASE_URL=https://hiring-proxy.gtx.dev/openai
ANTHROPIC_BASE_URL=https://hiring-proxy.gtx.dev/anthropic
```

---

## File Structure (Planned)

```
app/
├── layout.tsx
├── page.tsx                    # Main UI container
├── api/
│   └── translate/
│       └── route.ts            # API endpoint for translations
├── components/
│   ├── TextTranslator.tsx      # Phase 1: Text translation UI
│   ├── ProviderSelector.tsx    # Phase 2: Provider selection
│   └── JsonTranslator.tsx      # Phase 3: JSON translation
├── lib/
│   ├── ai/
│   │   ├── openai.ts           # OpenAI client setup
│   │   ├── anthropic.ts        # Anthropic client setup
│   │   └── translateText.ts    # Translation logic
│   ├── json/
│   │   └── translateJson.ts    # JSON translation helper
│   └── types.ts                # Shared TypeScript types
└── globals.css                 # TailwindCSS styles
```

---

## Implementation Phases

### Phase 1: Translation UI Interface
1. Create API endpoint `/api/translate/route.ts`
2. Set up OpenAI and Anthropic client helpers
3. Build `TextTranslator.tsx` component with:
   - Input field
   - Language dropdowns (source, target)
   - Translate button
   - Output display
4. Add loading & error states

### Phase 2: Provider Selection
1. Create `ProviderSelector.tsx` component
2. Add state management (context or useState)
3. Store provider selection in localStorage
4. Pass selected provider to API calls

### Phase 3: JSON Support
1. Create `JsonTranslator.tsx` component
2. Build `translateJson.ts` utility function
3. Recursively translate string values (preserve keys)
4. Handle invalid JSON gracefully
5. Display formatted output

---

## Code Quality Standards

- ✅ TypeScript strict mode (no `any`)
- ✅ Proper error handling for API failures
- ✅ Meaningful variable names
- ✅ Comments for complex logic
- ✅ Clean component structure
- ✅ Reusable utility functions
- ✅ Credit any copied code

---

## Known Questions / Decisions

- [ ] How to handle language codes? (ISO 639-1 or full names?)
- [ ] Should we support all ISO languages or a curated list?
- [ ] How to display errors to users?
- [ ] Any specific UI/UX preferences?
- [ ] Should JSON upload be via file picker or text area only?

---

## Bonus Features (If Time Permits)

- [ ] File upload for JSON
- [ ] Copy-to-clipboard buttons
- [ ] Translation history
- [ ] Dark mode toggle
- [ ] Keyboard shortcuts
- [ ] Local caching for repeated translations
- [ ] Batch translations

---

## Testing Checklist

- [ ] Text translation works with both providers
- [ ] JSON translation preserves structure & keys
- [ ] Error handling works (invalid JSON, API errors)
- [ ] Provider selection persists across sessions
- [ ] UI is responsive (mobile-friendly)

---

## Deployment Notes

- [ ] Environment variables secured (no hardcoding)
- [ ] API keys kept server-side only
- [ ] Rate limiting considerations
- [ ] CORS handled properly

---

## Next Steps

1. Confirm authentication token availability
2. Initialize dependencies (openai, anthropic SDKs)
3. Create type definitions
4. Build API endpoint
5. Create Phase 1 component
6. Test with both providers
7. Proceed to Phase 2 & 3

