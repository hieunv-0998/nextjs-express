import request from 'superagent';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const response = await request
      .get('https://api.spotify.com/v1/search')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`)
      .query({
        type: 'artist',
        q: req.query.query,
        limit: req.query.limit,
        offset: req.query.offset
      });
    res.status(200).json(response.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
} 