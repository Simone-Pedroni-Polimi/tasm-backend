import { supabase } from "../lib/supabase"

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        const { data, error } = await supabase
            .from('Faqs')
            .select();

        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(200).json(data);
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}