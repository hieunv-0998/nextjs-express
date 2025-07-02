import request from 'superagent';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { id } = req.query;
  try {
    const response = await request
      .get(`https://api.spotify.com/v1/albums/${id}`)
      .set('Authorization', `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`);
    res.status(200).json(response.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
} 