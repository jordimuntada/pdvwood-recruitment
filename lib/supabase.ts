import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _supabase: SupabaseClient | null = null
let _supabaseAdmin: SupabaseClient | null = null

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Variable d'entorn no configurada: ${name}`)
  }
  return value
}

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    _supabase = createClient(
      requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
      requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
    )
  }
  return _supabase
}

export function getSupabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(
      requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
      requireEnv('SUPABASE_SERVICE_ROLE_KEY')
    )
  }
  return _supabaseAdmin
}

export async function uploadCV(file: File, candidateId: string): Promise<string> {
  const admin = getSupabaseAdmin()
  const fileExt = file.name.split('.').pop()
  const fileName = `${candidateId}/${Date.now()}.${fileExt}`
  const filePath = `cvs/${fileName}`

  const { error: uploadError } = await admin.storage
    .from('candidate-cvs')
    .upload(filePath, file)

  if (uploadError) {
    throw new Error(`No s'ha pogut pujar el CV: ${uploadError.message}`)
  }

  const { data: signed, error: signedError } = await admin.storage
    .from('candidate-cvs')
    .createSignedUrl(filePath, 60 * 60 * 24 * 7)

  if (signedError || !signed) {
    return filePath
  }

  return signed.signedUrl
}

export async function saveCandidate(data: {
  positionId: string
  positionTitle: string
  firstName: string
  lastName: string
  email: string
  phone: string
  postalCode: string
  experience: string
  motivation: string
  cvUrl: string
}) {
  const row = {
    position_id: data.positionId,
    position_title: data.positionTitle,
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    phone: data.phone,
    postal_code: data.postalCode,
    experience: data.experience,
    motivation: data.motivation,
    cv_url: data.cvUrl,
  }

  const { data: candidate, error } = await getSupabaseAdmin()
    .from('candidates')
    .insert([row])
    .select()
    .single()

  if (error) {
    throw new Error(`No s'ha pogut desar el candidat: ${error.message}`)
  }

  return candidate
}
