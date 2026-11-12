export interface Position {
  id: string
  title: string
  slug: string
  description: string
  requirements: string[]
  benefits: string[]
}

export const positions: Position[] = [
  {
    id: 'manteniment-polivalent',
    title: 'Manteniment Polivalent',
    slug: 'manteniment-polivalent',
    description: 'Busquem un professional de manteniment polivalent per assegurar el correcte funcionament de les nostres instal·lacions.',
    requirements: [
      'Experiència en manteniment general',
      'Coneixements d\'electricitat i lampisteria',
      'Capacitat per treballar de forma autònoma',
      'Disponibilitat immediata',
    ],
    benefits: [
      'Contracte estable',
      'Horari flexible',
      'Formació contínua',
      'Ambient de treball agradable',
    ],
  },
  {
    id: 'venedor-ferreteria',
    title: 'Venedor/a de Ferreteria',
    slug: 'venedor-ferreteria',
    description: 'Busquem un/a venedor/a apassionat/da per la ferreteria per atendre els nostres clients i oferir les millors solucions.',
    requirements: [
      'Experiència en vendes (preferiblement ferreteria)',
      'Coneixements tècnics de productes de ferreteria',
      'Excel·lents habilitats de comunicació',
      'Orientació al client',
    ],
    benefits: [
      'Comissions per vendes',
      'Descptes en productes',
      'Formació en productes',
      'Ambient dinàmic',
    ],
  },
  {
    id: 'aprenent',
    title: 'Aprenent',
    slug: 'aprenent',
    description: 'Programa d\'aprenentatge per a joves talents que volen desenvolupar una carrera en el sector de la fusta i la construcció.',
    requirements: [
      'Ganes d\'aprendre',
      'Compromís i responsabilitat',
      'Actitud positiva',
      'Disponibilitat per formar-se',
    ],
    benefits: [
      'Formació remunerada',
      'Mentoria personalitzada',
      'Possibilitat de contractació',
      'Experiència pràctica',
    ],
  },
  {
    id: 'venedor-cuines-practiques',
    title: 'Venedor/a de Cuines - Pràctiques',
    slug: 'venedor-cuines-practiques',
    description: 'Oportunitat per aprendre el món de la venda de cuines des de zero. Ideal per a persones que volen iniciar-se en aquest sector.',
    requirements: [
      'Interès en el disseny i la venda',
      'Creativitat',
      'Bones habilitats socials',
      'Ganes de créixer professionalment',
    ],
    benefits: [
      'Formació completa',
      'Pràctiques remunerades',
      'Possibilitat de contractació',
      'Sector en creixement',
    ],
  },
]

export function getPositionBySlug(slug: string): Position | undefined {
  return positions.find(p => p.slug === slug)
}
