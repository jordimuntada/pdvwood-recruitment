# RULES.md - Regles i Estàndards del Projecte

## Regles Principals

### 1. Qualitat del Codi
- **DRY** (No Repeteixis): Extreure lògica comuna en funcions reutilitzables
- **KISS** (Mantingues-ho Simple): Preferir solucions simples i llegibles
- **YAGNI** (No ho necessitaràs): No afegir funcionalitats fins que siguin necessàries
- **Principis SOLID**: Seguir SOLID al dissenyar classes i mòduls

### 2. Convencions de Nomenclatura
| Tipus | Convenció | Exemple |
|-------|-----------|---------|
| Variables | camelCase | `nomUsuari`, `compteItems` |
| Funcions | camelCase | `obtenirDadesUsuari()`, `calcularTotal()` |
| Classes | PascalCase | `ServeiUsuari`, `TargetaProducte` |
| Constants | UPPER_SNAKE_CASE | `MAX_INTENTS_REINTENT`, `URL_BASE_API` |
| Arxius | kebab-case o PascalCase | `servei-usuari.ts`, `TargetaUsuari.tsx` |
| Taules BD | snake_case (plural) | `usuaris`, `sol_licituds_treball` |

### 3. Gestió d'Errors
- Gestionar sempre els errors amb gràcia
- Utilitzar tipus d'error personalitzats quan sigui apropiat
- Registrar errors amb context per depuració
- Mostrar missatges d'error amigables per a l'usuari
- No exposar mai detalls d'errors sensibles als usuaris
- **Tots els missatges d'error han d'estar en CATALÀ**

### 4. Disseny API
- Utilitzar convencions RESTful
- Versionar APIs quan es facin canvis que trenquin compatibilitat
- Documentar tots els endpoints
- Utilitzar codis d'estat HTTP correctes
- Implementar limitació de taxa per endpoints públics

### 5. Regles de Base de Dades
- Utilitzar migracions per canvis d'esquema
- No modificar mai migracions existents
- Afegir índexs per columnes consultades freqüentment
- Utilitzar transaccions per operacions multi-pas
- Fer còpia de seguretat abans de canvis importants

### 6. Regles de Seguretat
- Validar totes les entrades (client i servidor)
- Netejar dades abans d'operacions de base de dades
- Utilitzar consultes parametritzades (prevenir injecció SQL)
- Implementar autenticació i autorització adequades
- Utilitzar HTTPS per a totes les comunicacions
- Emmagatzemar contrasenyes amb hash (bcrypt/argon2)
- No registrar mai informació sensible

### 7. Regles de Rendiment
- Optimitzar imatges i actius
- Utilitzar càrrega diferida quan sigui apropiat
- Implementar estratègies de memòria cau
- Monitorar i optimitzar consultes de base de dades
- Utilitzar paginació per conjunts de dades grans

### 8. Regles de Documentació
- Documentar totes les APIs i funcions públiques
- Mantenir README.md actualitzat
- Afegir comentaris en línia per lògica complexa
- Documentar decisions en ADR (Architecture Decision Records)
- Actualitzar aquest fitxer quan s'afegeixin noves regles

### 9. Regles d'Idioma
- **Tota la interfície d'usuari ha d'estar en CATALÀ**
- Missatges del sistema en català
- Errors i confirmacions en català
- Documentació interna pot estar en català o anglès
- Noms de variables i funcions en anglès (estàndard de codi)

### 10. Regles de Dependències i Build
- Les devDependencies són necessàries al build (TypeScript, Tailwind, ESLint)
- **No definir `NODE_ENV=production`** com a variable d'entorn en entorns de build:
  fa que `npm install` ometi les devDependencies i trenca els alias `@/*`
- Mantenir `.npmrc` amb `include=dev` per garantir la instal·lació completa
- Verificar `npm run build` localment abans de fer push
- Els clients de serveis externs (Supabase, Twilio) s'han d'inicialitzar de forma
  **lazy** (dins d'una funció), mai a nivell de mòdul, perquè el build no falli
  quan falten variables d'entorn

## Llista de Verificació de Revisió

Abans de fusionar qualsevol codi:
- [ ] Segueix totes les regles anteriors
- [ ] Els tests passen
- [ ] Lint passa
- [ ] Sense errors/avisos de consola
- [ ] Documentació actualitzada
- [ ] Codi revisat per un company
- [ ] Tot el text visible està en català

## Actualitzacions de Regles
- Les regles es poden afegir/modificar a mesura que evoluciona el projecte
- Tots els membres de l'equip han d'acordar els canvis de regles
- Documentar el raonament darrere de canvis significatius de regles
