import { NextRequest, NextResponse } from 'next/server'
import { saveCandidate, uploadCV } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const positionId = formData.get('positionId') as string
    const positionTitle = formData.get('positionTitle') as string
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const postalCode = formData.get('postalCode') as string
    const experience = formData.get('experience') as string
    const motivation = formData.get('motivation') as string
    const cvFile = formData.get('cv') as File

    if (!positionId || !firstName || !lastName || !email || !phone || !postalCode || !experience || !motivation || !cvFile) {
      return NextResponse.json(
        { error: 'Tots els camps són obligatoris' },
        { status: 400 }
      )
    }

    const candidateId = `${Date.now()}-${Math.random().toString(36).substring(7)}`
    const cvUrl = await uploadCV(cvFile, candidateId)

    const candidate = await saveCandidate({
      positionId,
      positionTitle,
      firstName,
      lastName,
      email,
      phone,
      postalCode,
      experience,
      motivation,
      cvUrl,
    })

    const webhookUrl = process.env.N8N_WEBHOOK_URL
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: candidate.id,
          positionId,
          positionTitle,
          firstName,
          lastName,
          email,
          phone,
          postalCode,
          experience,
          motivation,
          cvUrl,
          submittedAt: new Date().toISOString(),
        }),
      }).catch(err => console.error('Error de webhook:', err))
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Sol·licitud enviada correctament',
      candidateId: candidate.id 
    })
  } catch (error) {
    console.error('Error d\'enviament de sol·licitud:', error)
    return NextResponse.json(
      { error: 'No s\'ha pogut enviar la sol·licitud' },
      { status: 500 }
    )
  }
}
