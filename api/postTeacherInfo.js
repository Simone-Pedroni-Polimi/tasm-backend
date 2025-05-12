import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,  // La URL di Supabase
  process.env.SUPABASE_KEY   // La chiave API di Supabase
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { TeacherId } = req.body; // Ottieni l'ID dal corpo della richiesta

    if (!TeacherId) {
      // Se l'ID non è stato fornito, ritorna un errore 400
      return res.status(400).json({ error: 'ID mancante' });
    }

    try {
      // Recupera il todo con il dato id dalla tabella "todos"
      const { data, error } = await supabase
        .from('Teacher')
        .select(`
          TeacherId,
          Name,
          Mantra,
          Description,
          History,
          MainImageURL,
          BannerImageUrl,
          History,
          TeacherActivity(
            Activity(
              ActivityId,
              BannerImgUrl,
              Title
            )
          ),
          TeacherEvent(
            Event(
              EventId,
              BannerImgUrl,
              Title,
              ShortIntroduction
            )
          )
          TeacherCert(
            Certification(
              CertificationId,
              Title
            )
          )
        `)
        .eq('TeacherId', TeacherId)  // Aggiungi la condizione per l'ID
        .single(); // Usa .single() per ottenere un singolo risultato (se esiste)

      if (error) {
        // Se c'è un errore con Supabase, restituisci un errore 500
        return res.status(500).json({ error: error.message });
      }

      if (!data) {
        // Se il dato non esiste per l'ID specificato, ritorna 404
        return res.status(404).json({ error: 'ToDo non trovato' });
      }

      // Rispondi con i dati ottenuti
      return res.status(200).json(data);
    } catch (err) {
      // Gestisce eventuali errori nel codice
      console.error('Errore interno', err);
      return res.status(500).json({ error: 'Errore interno del server' });
    }
  } else {
    // Se il metodo non è POST, ritorna 405 (Method Not Allowed)
    res.status(405).json({ error: 'Metodo non permesso' });
  }
}
