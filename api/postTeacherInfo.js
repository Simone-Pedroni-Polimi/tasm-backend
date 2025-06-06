import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,  // La URL di Supabase
  process.env.SUPABASE_KEY   // La chiave API di Supabase
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

  // ... (continua col resto del tuo codice)
  if (req.method === 'POST') {
    const { TeacherName } = req.body;

    if (!TeacherName) {
      return res.status(400).json({ error: 'ID mancante' });
    }

    try {
      const { data, error } = await supabase
      .from('Teacher')
       .select(`
  TeacherId,
  Name,
  Mantra,
  MainImageURL,
  Description,
  History,
  BannerImageURL,
  TeacherActivity(
    Activity(
      Title,
      ActivityId,
      BannerImageURL
    )
  ),
  TeacherEvent(
    Event(
      EventId,
      Date,
      StartTime,
      EndTime,
      Location,
      BannerImageURL,
      Name,
      ShortIntroduction,
      GuestEvent(
        Guest(
          Name,
          MainImageURL
        )
      )
    )
  ),
  TeacherCert(
    Certification(
      CertificationId,
      Title
    )
  ),
  TeacherImages(
    Image(
      URL
    )
  )
`)
 .eq('Name', (TeacherName));

      /*.select(`
        TeacherId,
        Name,
        Mantra,
        Description,
        History,
        MainImageURL,
        BannerImageURL,
        TeacherActivity:TeacherActivity!HostingTeacherId(
          Activity(
            ActivityId,
            BannerImageURL,
            Title
          )
        ),
        TeacherEvent:TeacherEvent!TeacherId(
          Event(
            EventId,
            BannerImageURL,
            Name,
            ShortIntroduction
          )
        ),
        TeacherCert:TeacherCert!TeacherId(
          Certification(
            CertificationId,
            Title
          )
        )
      `).select(`
        TeacherId,
        Name,
        Mantra,
        MainImageURL,
        Description, 
        History,
        BannerImageURL,
        TeacherActivity(
          Activity(
            Title,
            ActivityId,
            BannerImageURL
          )
        ),
        TeacherEvent(
          Event(
            EventId,
            Date,
            StartTime,
            EndTime,
            Location,  
            BannerImageURL,
            Name,
            ShortIntroduction,
             GuestEvent(
                Guest(
                  Name,
                  MainImageURL
                )
          )
        ),
        TeacherCert(
          Certification(
            CertificationId,
            Title
          )
        ),
        TeacherImages(
          Image(
            URL
          )
        )
      `)*/
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      if (!data || data.length === 0) {
        return res.status(404).json({ error: 'Teacher non trovato' });
      }

      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: 'Errore interno del server' });
    }
  } else {
    return res.status(405).json({ error: 'Metodo non permesso' });
  }
}
