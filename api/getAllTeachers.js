import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {

   // ✅ Inserisci questi header per gestire CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ✅ Rispondi subito alle richieste preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method === 'GET') {
    // Recupera il todo con il dato id dalla tabella "todos"
      /*Recupera info base dei teacher: 
          IdTeacher, 
          Name, 
          Mantra, 
          MainImageUrl, 
          nameActivity che hosta
      */
      /*const { data, error } = await supabase
        .from('Teacher') // TODO query to retrieve all teachers 
        .select('TeacherId, Name, Mantra, MainImageURL');
*/
    const { data, error } = await supabase
      .from('Teacher')
      .select(`
        TeacherId,
        Name,
        Mantra,
        MainImageURL,
        TeacherActivity(
          Activity(
            Title
          )
        )
      `);
      
    
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json(data);
    }
  } else {
    res.status(405).json({ error: 'Metodo non permesso' });
  }
}
