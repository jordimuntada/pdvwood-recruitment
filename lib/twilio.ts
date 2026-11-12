import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const phoneNumber = process.env.TWILIO_PHONE_NUMBER

if (!accountSid || !authToken || !phoneNumber) {
  throw new Error('Credencials de Twilio no configurades')
}

const client = twilio(accountSid, authToken)

const verificationCodes = new Map<string, { code: string; expires: number }>()

export async function sendVerificationCode(phone: string): Promise<void> {
  const code = Math.floor(100000 + Math.random() * 900000).toString()
  const expires = Date.now() + 10 * 60 * 1000

  verificationCodes.set(phone, { code, expires })

  await client.messages.create({
    body: `El teu codi de verificació de PDVWood és: ${code}. Vàlid per 10 minuts.`,
    from: phoneNumber,
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
