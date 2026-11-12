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

## Notes
- Aquest fitxer s'ha d'actualitzar quan s'afegeixin noves funcionalitats
- Documentar qualsevol convenció específica del projecte a sota
