import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://havcynwpdiaikfktpdad.supabase.co'
const supabaseKey = 'sb_publishable_nWvL65knAskQ9hKfHdxAGQ_Dp1qZ45u'

export const supabase = createClient(supabaseUrl, supabaseKey)