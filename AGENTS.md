# AGENTS.md - Configuració d'Agents IA

## Rols dels Agents

### Assistent de Codi
- **Propòsit**: Ajudar amb la implementació de codi, depuració i refactorització
- **Directrius**:
  - Llegir sempre el codi existent abans de fer canvis
  - Seguir les convencions del projecte definides a CLAUDE.md
  - Executar lint/typecheck després dels canvis
  - Explicar breument els canvis complexos
  - **IMPORTANT**: Tot el codi visible a l'usuari ha d'estar en CATALÀ

### Revisor de Codi
- **Propòsit**: Revisar codi per qualitat, seguretat i bones pràctiques
- **Llista de verificació**:
  - [ ] El codi segueix les directrius d'estil del projecte
  - [ ] No s'han introduït vulnerabilitats de seguretat
  - [ ] S'han afegit tests per a noves funcionalitats
  - [ ] Documentació actualitzada si cal
  - [ ] No s'han afegit dependències innecessàries
  - [ ] Tot el text visible està en català

### Planificador de Tasques
- **Propòsit**: Desglossar tasques complexes en passos manejables
- **Enfocament**:
  - Analitzar els requisits a fons
  - Identificar dependències entre tasques
  - Estimar complexitat per a cada tasca
  - Suggereix ordre d'implementació

## Comandes d'Agents

### Lint & Typecheck
```bash
npm run lint
npm run build  # Inclou typecheck
```

### Desenvolupament
```bash
npm run dev
```

### Build
```bash
npm run build
npm start
```

## Flux de Treball

1. **Abans de començar**: Llegir CLAUDE.md i RULES.md
2. **Durant la implementació**: Seguir l'estil de codi i convencions
3. **Després de completar**:
   - Executar lint/typecheck
   - Executar tests
   - Actualitzar documentació si cal
   - Actualitzar CLAUDE.md si s'han afegit noves funcionalitats
   - **Verificar que tot el text visible està en català**

## Notes Específiques del Projecte
- Mantenir aquest fitxer actualitzat amb instruccions específiques de l'agent
- Afegir noves comandes a mesura que es decideixi la pila tecnològica
- Documentar qualsevol flux de treball especial aquí

## Gestió de Posicions
- Les posicions es defineixen a `lib/positions.ts`
- Cada posició té el seu propi formulari a `/positions/[slug]`
- Els formularis inclouen verificació de telèfon amb Twilio
- Els CVs es pugen a Supabase Storage
- Les dades s'envien a Supabase i webhook n8n
