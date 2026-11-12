# PDVWood Recruitment

Lloc web de reclutament per a **PDVWood** — captura de candidats mitjançant formularis
per posició, amb verificació de telèfon per SMS i integració amb Supabase i n8n.

**Producció**: https://pdvwood-careers.onrender.com
**Domini objectiu**: `careers.pdvwood.com`
**Idioma**: Català

## Posicions disponibles

| Posició | URL |
|---|---|
| Manteniment Polivalent | `/positions/manteniment-polivalent` |
| Venedor/a de Ferreteria | `/positions/venedor-ferreteria` |
| Aprenent | `/positions/aprenent` |
| Venedor/a de Cuines - Pràctiques | `/positions/venedor-cuines-practiques` |

Les posicions es defineixen a `lib/positions.ts`. Per afegir-ne una de nova, afegeix
l'entrada a l'array `positions` i la pàgina es genera automàticament (SSG).

## Pila tecnològica

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS**
- **Supabase** — taula `candidates` + bucket `candidate-cvs`
- **Twilio** — verificació de telèfon amb codi SMS de 6 dígits
- **n8n** — webhook per automatitzacions
- **Render** — hosting

## Desenvolupament local

```bash
npm install
cp .env.example .env.local   # omple les credencials
npm run dev
```

## Variables d'entorn

| Variable | Descripció |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del projecte Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clau anònima de Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Clau service-role (pujada de CVs) |
| `TWILIO_ACCOUNT_SID` | Account SID de Twilio |
| `TWILIO_AUTH_TOKEN` | Auth Token de Twilio |
| `TWILIO_PHONE_NUMBER` | Número emissor en format E.164 |
| `N8N_WEBHOOK_URL` | URL del webhook de n8n |

> ⚠️ **No defineixis `NODE_ENV=production`** com a variable d'entorn al hosting.
> Fa que `npm install` ometi les devDependencies i el build falli perquè Next.js
> no pot resoldre els alias `@/*`.

## Desplegament

El push a la branca `main` desplega automàticament a Render.

- **Build**: `npm install && npm run build`
- **Start**: `npm start`

## Configuració de Supabase

```sql
CREATE TABLE candidates (
  id BIGSERIAL PRIMARY KEY,
  position_id TEXT NOT NULL,
  position_title TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  experience TEXT NOT NULL,
  motivation TEXT NOT NULL,
  cv_url TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'new'
);

CREATE INDEX idx_candidates_position ON candidates(position_id);
CREATE INDEX idx_candidates_email ON candidates(email);
CREATE INDEX idx_candidates_submitted_at ON candidates(submitted_at DESC);
```

Crea també un bucket **privat** anomenat `candidate-cvs`.

> Nota: els noms de columnes de la taula són `snake_case`, mentre que el codi envia
> els camps en `camelCase`. O bé ajusta el mapping a `lib/supabase.ts`, o bé anomena
> les columnes en `camelCase` per fer-les coincidir.

## n8n

Consulta `N8N_WORKFLOW_SETUP.txt` per la guia completa del flux de treball.

## Documentació del projecte

- `CLAUDE.md` — instruccions del projecte i dades de desplegament
- `AGENTS.md` — configuració i rols dels agents IA
- `RULES.md` — regles i estàndards de codi
- `PERSONALITY.md` — to i estil de comunicació
