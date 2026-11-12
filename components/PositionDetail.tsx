'use client'

import { Position } from '@/lib/positions'
import { ApplicationForm } from './ApplicationForm'

interface Props {
  position: Position
}

export function PositionDetail({ position }: Props) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h1 className="text-4xl font-bold mb-4 pdv-text-gradient">
          {position.title}
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          {position.description}
        </p>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            Requisits
          </h2>
          <ul className="space-y-2">
            {position.requirements.map((req, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-gray-700">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            Beneficis
          </h2>
          <ul className="space-y-2">
            {position.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-green-600 mr-2">★</span>
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center pdv-text-gradient">
          Formulari de Sol·licitud
        </h2>
        <ApplicationForm positionId={position.id} positionTitle={position.title} />
      </div>
    </div>
  )
}
