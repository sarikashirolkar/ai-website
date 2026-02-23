# AI Website (Cloudflare + FastAPI)

Production-ready starter for an AI workflow product using:
- Next.js + Tailwind + shadcn-style UI
- FastAPI + LangChain-ready orchestration layer
- Redis caching
- Docker-based local dev
- Cloudflare-first frontend deployment guidance

## Monorepo layout

- `apps/web`: Next.js app (frontend)
- `apps/api`: FastAPI app (AI backend)
- `infra/docker-compose.yml`: local orchestration

## 1) Local setup

### Prerequisites
- Node 20+
- Python 3.11+
- Docker (optional but recommended)

### Option A: Docker (fastest)

```bash
cd infra
docker compose up --build
```

- Frontend: `http://localhost:3000`
- API docs: `http://localhost:8000/docs`
- Redis: `localhost:6379`

### Option B: Run separately

```bash
# Web
cd apps/web
npm install
npm run dev

# API
cd apps/api
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

## 2) Required env vars

### `apps/api/.env`

```env
OPENAI_API_KEY=your_openai_key
OPENAI_MODEL=gpt-4o-mini
REDIS_URL=redis://localhost:6379/0
ALLOWED_ORIGINS=http://localhost:3000
```

### `apps/web/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 3) Deploy without Vercel (Cloudflare)

### Frontend on Cloudflare
Use Cloudflare Workers/Pages with OpenNext for Next.js SSR support.

High-level:
1. Connect repo to Cloudflare.
2. Build command (from repo root): `cd apps/web && npm install && npm run build`
3. Set `NEXT_PUBLIC_API_URL` to your production API URL.
4. Deploy.

### Backend (FastAPI)
Cloudflare Pages does not natively host long-running Python ASGI apps. Use one of:
1. Docker host (VM), place behind Cloudflare proxy.
2. Cloudflare Tunnel to your FastAPI host.
3. Cloudflare Containers (if enabled for your account).

## 4) Roadmap to your full stack

- Supabase pgvector for long-term memory.
- Pinecone for high-scale semantic retrieval.
- Redis for short-term cache and rate limiting.
- LangGraph for multi-step agent flows.
- Add Anthropic/Hugging Face/Replicate providers in backend provider layer.

## 5) GitHub push

```bash
git add .
git commit -m "feat: scaffold ai website monorepo"
git push -u origin main
```
