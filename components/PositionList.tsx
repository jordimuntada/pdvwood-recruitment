'use client'

import Link from 'next/link'
import { positions } from '@/lib/positions'

export function PositionList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {positions.map((position) => (
        <Link
          key={position.id}
          href={`/positions/${position.slug}`}
          className="block bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <h2 className="text-2xl font-bold mb-3 pdv-text-gradient">
            {position.title}
          </h2>
          <p className="text-gray-600 mb-4">
            {position.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {position.requirements.slice(0, 2).map((req, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {req}
              </span>
            ))}
          </div>
          <div className="text-primary font-semibold hover:underline">
            Veure detalls i aplicar →
          </div>
        </Link>
      ))}
    </div>
  )
}
