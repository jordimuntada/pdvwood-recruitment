# CLAUDE.md - Instruccions del Projecte

## Visió General del Projecte
**PDVWood Recruitment** - Sistema de gestió de reclutament per a PDVWood, una empresa de la indústria de la fusta.

## Estat Actual
- **Idioma**: Català (solely)
- **Domini**: careers.pdvwood.com
- **Posicions Disponibles**:
  - Manteniment Polivalent
  - Venedor/a de Ferreteria
  - Aprenent
  - Venedor/a de Cuines - Pràctiques

## Directrius de Desenvolupament

### Estil de Codi
- Utilitzar convencions de nomenclatura consistents (camelCase per variables/funcions, PascalCase per classes/components)
- Seguir els patrons de codi existents quan s'afegeixin noves funcions
- Mantenir les funcions petites i enfocades (responsabilitat única)
- Afegir comentaris JSDoc per a totes les funcions i APIs públiques

### Organització d'Arxius
- Components: `components/`
- Pàgines: `app/`
- Serveis/API: `app/api/`
- Utilitats: `lib/`
- Tipus: `lib/` (tipus TypeScript)
- Estils: `app/globals.css`

### Convencions de Git
- Missatges de commit: Utilitzar format convencional
  - `feat:` noves funcionalitats
  - `fix:` correccions d'errors
  - `docs:` canvis de documentació
  - `style:` format, sense canvis de codi
  - `refactor:` refactorització de codi
  - `test:` afegir tests
  - `chore:` tasques de manteniment

### Idioma
- **Tota la interfície d'usuari ha d'estar en CATALÀ**
- Missatges del sistema, errors i confirmacions en català
- Documentació interna pot estar en català o anglès

## Característiques Actuals
- [x] Sistema de formularis per posicions
- [x] Verificació de telèfon amb Twilio
- [x] Pujada de CV a Supabase Storage
- [x] Integració amb webhook n8n
- [x] Múltiples posicions de treball
- [ ] Panell d'administració
- [ ] Sistema de correu electrònic per candidats

## Desplegament

### Repositori i URLs
- **GitHub**: https://github.com/jordimuntada/pdvwood-recruitment (públic, branca `main`)
- **Render**: https://pdvwood-careers.onrender.com
- **Servei Render**: `pdvwood-careers` (ID `srv-dbqqt73tqb8s73bpefgg`, workspace `tea-cvr4hgre5dus7385i37g`)
- **Regió**: Frankfurt · **Pla**: free · **Auto-deploy**: activat en cada push a `main`
- **Domini objectiu**: `careers.pdvwood.com` (pendent de configurar DNS)

### Configura al Render
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Runtime**: Node

### ⚠️ No definir `NODE_ENV=production` com a variable d'entorn
Si es defineix manualment, `npm install` **omet les devDependencies** i Next.js no pot
llegir els alias `@/*` del `tsconfig.json` → el build falla amb
`Module not found: Can't resolve '@/components/...'`.
El fitxer `.npmrc` inclou `include=dev` com a xarxa de seguretat.

### Variables d'entorn pendents de configurar
Supabase **ja està configurat** al Render. Falten:
`TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`, `N8N_WEBHOOK_URL`.

### Supabase
- **Projecte**: PDVWOOD.IN · ref `gerrcbypvofvfpaioihc` · regió `eu-west-1`
- **Taula**: `candidates` (columnes `snake_case`, RLS activat)
- **Bucket**: `candidate-cvs` (privat, URLs signades de 7 dies)
- Els INSERTs i pujades de CVs utilitzen el client `service_role` (byPassa RLS)
- `lib/supabase.ts` mapeja `camelCase` (codi) → `snake_case` (BD)

## Notes
- Aquest fitxer s'ha d'actualitzar quan s'afegeixin noves funcionalitats
- Documentar qualsevol convenció específica del projecte a sota
