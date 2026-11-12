import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export async function uploadCV(file: File, candidateId: string): Promise<string> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${candidateId}/${Date.now()}.${fileExt}`
  const filePath = `cvs/${fileName}`

  const { error: uploadError } = await supabaseAdmin.storage
    .from('candidate-cvs')
    .upload(filePath, file)

  if (uploadError) {
    throw new Error(`No s'ha pogut pujar el CV: ${uploadError.message}`)
  }

  const { data } = supabaseAdmin.storage
    .from('candidate-cvs')
    .getPublicUrl(filePath)

  return data.publicUrl
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
  const { data: candidate, error } = await supabase
    .from('candidates')
    .insert([data])
    .select()
    .single()

  if (error) {
    throw new Error(`No s'ha pogut desar el candidat: ${error.message}`)
  }

  return candidate
}
