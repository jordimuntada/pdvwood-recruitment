import { NextRequest, NextResponse } from 'next/server'
import { sendVerificationCode, verifyCode } from '@/lib/twilio'

export async function POST(request: NextRequest) {
  try {
    const { phone, code, action } = await request.json()

    if (!phone) {
      return NextResponse.json(
        { error: 'El número de telèfon és obligatori' },
        { status: 400 }
      )
    }

    if (action === 'send') {
      await sendVerificationCode(phone)
      return NextResponse.json({ success: true, message: 'Codi de verificació enviat' })
    }

    if (action === 'verify') {
      if (!code) {
        return NextResponse.json(
          { error: 'El codi de verificació és obligatori' },
          { status: 400 }
        )
      }

      const isValid = verifyCode(phone, code)
      
      if (!isValid) {
        return NextResponse.json(
          { error: 'Codi de verificació invàlid o caducat' },
          { status: 400 }
        )
      }

      return NextResponse.json({ success: true, message: 'Telèfon verificat' })
    }

    return NextResponse.json(
      { error: 'Acció no vàlida' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error de verificació de telèfon:', error)
    return NextResponse.json(
      { error: 'No s\'ha pogut processar la verificació' },
      { status: 500 }
    )
  }
}
