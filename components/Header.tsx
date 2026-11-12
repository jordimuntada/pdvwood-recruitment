'use client'

export function Header() {
  return (
    <header className="pdv-gradient text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8" style={{ color: '#8B4513' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7 3.5v7.64l-7 3.5-7-3.5V7.68l7-3.5z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">PDVWood</h1>
              <p className="text-sm opacity-90">Creant Excel·lència en Fusta</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="hover:text-gray-200 transition">Inici</a>
            <a href="#about" className="hover:text-gray-200 transition">Sobre Nosaltres</a>
            <a href="#contact" className="hover:text-gray-200 transition">Contacte</a>
          </nav>
        </div>
      </div>
    </header>
  )
}
