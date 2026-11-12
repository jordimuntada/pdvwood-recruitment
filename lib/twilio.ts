import twilio, { Twilio } from 'twilio'

let _client: Twilio | null = null

function getClient(): Twilio {
  if (!_client) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    if (!accountSid || !authToken) {
      throw new Error('Credencials de Twilio no configurades')
    }
    _client = twilio(accountSid, authToken)
  }
  return _client
}

const verificationCodes = new Map<string, { code: string; expires: number }>()

export async function sendVerificationCode(phone: string): Promise<void> {
  const fromNumber = process.env.TWILIO_PHONE_NUMBER
  if (!fromNumber) {
    throw new Error('TWILIO_PHONE_NUMBER no configurat')
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString()
  const expires = Date.now() + 10 * 60 * 1000

  verificationCodes.set(phone, { code, expires })

  await getClient().messages.create({
    body: `El teu codi de verificació de PDVWood és: ${code}. Vàlid per 10 minuts.`,
    from: fromNumber,
    to: phone,
  })
}

export function verifyCode(phone: string, code: string): boolean {
  const stored = verificationCodes.get(phone)

  if (!stored) {
    return false
  }

  if (Date.now() > stored.expires) {
    verificationCodes.delete(phone)
    return false
  }

  if (stored.code !== code) {
    return false
  }

  verificationCodes.delete(phone)
  return true
}
