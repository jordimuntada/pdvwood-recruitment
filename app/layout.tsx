import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PDVWood Carreres - Uneix-te al Nostre Equip',
  description: 'Construeix la teva carrera amb PDVWood. Uneix-te al nostre equip de professionals qualificats en la indústria de la fusta.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ca">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
