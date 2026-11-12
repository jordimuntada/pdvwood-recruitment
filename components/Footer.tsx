'use client'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#DEB887' }}>PDVWood</h3>
            <p className="text-gray-400">
              Creant excel·lència en fusta des del primer dia. Construint carreres i creant qualitat.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Enllaços Ràpids</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition">Inici</a></li>
              <li><a href="#" className="hover:text-white transition">Sobre Nosaltres</a></li>
              <li><a href="/" className="hover:text-white transition">Carreres</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contacte</h4>
            <ul className="space-y-2 text-gray-400">
              <li>careers@pdvwood.com</li>
              <li>www.pdvwood.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} PDVWood. Tots els drets reservats.</p>
        </div>
      </div>
    </footer>
  )
}
