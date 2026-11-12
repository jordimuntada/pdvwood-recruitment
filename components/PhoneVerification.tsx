'use client'

import { useState } from 'react'

interface PhoneVerificationProps {
  phone: string
  onPhoneChange: (phone: string) => void
  onVerified: () => void
}

export function PhoneVerification({ phone, onPhoneChange, onVerified }: PhoneVerificationProps) {
  const [verificationCode, setVerificationCode] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState('')

  const handleSendCode = async () => {
    if (!phone) {
      setError('Si us plau, introdueix el teu número de telèfon')
      return
    }

    setIsSending(true)
    setError('')

    try {
      const response = await fetch('/api/verify-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, action: 'send' }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'No s\'ha pogut enviar el codi')
      }

      setCodeSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No s\'ha pogut enviar el codi de verificació')
    } finally {
      setIsSending(false)
    }
  }

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setError('Si us plau, introdueix el codi de verificació')
      return
    }

    setIsVerifying(true)
    setError('')

    try {
      const response = await fetch('/api/verify-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code: verificationCode, action: 'verify' }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Codi de verificació invàlid')
      }

      onVerified()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'La verificació ha fallat')
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="space-y-2">
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
        Número de Telèfon *
      </label>
      <div className="flex gap-2">
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          disabled={codeSent}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
          placeholder="+34612345678"
        />
        {!codeSent ? (
          <button
            type="button"
            onClick={handleSendCode}
            disabled={isSending}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? 'Enviant...' : 'Enviar Codi'}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setCodeSent(false)
              setVerificationCode('')
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Canviar
          </button>
        )}
      </div>

      {codeSent && (
        <div className="flex gap-2">
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Introdueix el codi de 6 dígits"
            maxLength={6}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleVerifyCode}
            disabled={isVerifying}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifying ? 'Verificant...' : 'Verificar'}
          </button>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      {codeSent && !error && (
        <p className="text-sm text-green-600">✓ Codi de verificació enviat al teu telèfon</p>
      )}
    </div>
  )
}
