# RAG Conversational UI (Angular 18 + Tailwind)

A modern, license-friendly Angular frontend for your FastAPI RAG backend.

## Features
- Conversation interface with session persistence (localStorage)
- Document management (upload PDF/DOCX, list, delete)
- Tailwind-based design (no Angular Material)
- Lightweight state store using Angular signals
- Strict TypeScript settings

## Project Structure
```
rag-ui/
  src/app/
    components/      # Reusable UI components
    pages/           # Route pages (conversation, documents)
    services/        # API services
    stores/          # Local state management
    types/           # API models/interfaces
    utils/           # Environment and helpers
```

## Setup
```bash
npm install
npm start
```
App runs at http://localhost:4200 and expects backend at http://localhost:8000

## Environment
Edit `src/app/utils/environment.ts` to change API base URL.

## Production Build
```bash
npm run build
```
Output in `dist/rag-ui`.

## Notes
- Sessions are client-side only; backend session_id continuity supported.
- Extend styling via Tailwind tokens in `tailwind.config.cjs`.

## License
All dependencies MIT or similarly permissive.
