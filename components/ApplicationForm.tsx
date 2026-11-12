'use client'

import { useState } from 'react'
import { PhoneVerification } from './PhoneVerification'

interface ApplicationFormProps {
  positionId: string
  positionTitle: string
}

export function ApplicationForm({ positionId, positionTitle }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    postalCode: '',
    experience: '',
    motivation: '',
  })
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!phoneVerified) {
      alert('Si us plau, verifica el teu número de telèfon primer')
      return
    }

    if (!cvFile) {
      alert('Si us plau, puja el teu CV')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('positionId', positionId)
      formDataToSend.append('positionTitle', positionTitle)
      formDataToSend.append('firstName', formData.firstName)
      formDataToSend.append('lastName', formData.lastName)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('postalCode', formData.postalCode)
      formDataToSend.append('experience', formData.experience)
      formDataToSend.append('motivation', formData.motivation)
      formDataToSend.append('cv', cvFile)

      const response = await fetch('/api/submit-application', {
        method: 'POST',
        body: formDataToSend,
      })

      if (!response.ok) {
        throw new Error('Ha fallat l\'enviament')
      }

      setSubmitStatus('success')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        postalCode: '',
        experience: '',
        motivation: '',
      })
      setCvFile(null)
      setPhoneVerified(false)
    } catch (error) {
      console.error('Error d\'enviament:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            Nom *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Joan"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Cognoms *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Garcia"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Correu Electrònic *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="joan.garcia@exemple.com"
        />
      </div>

      <PhoneVerification
        phone={formData.phone}
        onPhoneChange={(phone) => setFormData(prev => ({ ...prev, phone }))}
        onVerified={() => setPhoneVerified(true)}
      />

      <div>
        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
          On vius? (Codi Postal) *
        </label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          required
          value={formData.postalCode}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="08001"
        />
      </div>

      <div>
        <label htmlFor="cv" className="block text-sm font-medium text-gray-700 mb-2">
          Puja el teu CV *
        </label>
        <input
          type="file"
          id="cv"
          name="cv"
          accept=".pdf,.doc,.docx"
          required
          onChange={handleFileChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <p className="text-sm text-gray-500 mt-1">Formats acceptats: PDF, DOC, DOCX</p>
      </div>

      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
          Quina és la teva experiència? *
        </label>
        <textarea
          id="experience"
          name="experience"
          required
          value={formData.experience}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Explica'ns sobre la teva experiència professional..."
        />
      </div>

      <div>
        <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
          Quina és la teva motivació? *
        </label>
        <textarea
          id="motivation"
          name="motivation"
          required
          value={formData.motivation}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Per què vols unir-te a PDVWood?"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !phoneVerified || !cvFile}
        className="w-full pdv-gradient text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Enviant...' : 'Enviar Sol·licitud'}
      </button>

      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          ✓ Sol·licitud enviada correctament! Ens posarem en contacte aviat.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          ✗ L&apos;enviament ha fallat. Si us plau, torna-ho a intentar o contacta&apos;ns directament.
        </div>
      )}
    </form>
  )
}
