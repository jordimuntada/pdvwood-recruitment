import { Header } from '@/components/Header'
import { PositionList } from '@/components/PositionList'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 pdv-text-gradient">
              Construeix la Teva Carrera Amb Nosaltres
            </h1>
            <p className="text-lg text-gray-600">
              Uneix-te a PDVWood i forma part d'un equip que crea excel·lència en cada peça de fusta.
            </p>
          </div>
          <PositionList />
        </div>
      </main>
      <Footer />
    </div>
  )
}
