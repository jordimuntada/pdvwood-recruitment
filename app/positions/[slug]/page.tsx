import { PositionDetail } from '@/components/PositionDetail'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { positions } from '@/lib/positions'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return positions.map((position) => ({
    slug: position.slug,
  }))
}

export default function PositionPage({ params }: Props) {
  const position = positions.find(p => p.slug === params.slug)
  
  if (!position) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <PositionDetail position={position} />
      </main>
      <Footer />
    </div>
  )
}
