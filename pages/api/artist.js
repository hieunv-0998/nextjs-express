import request from 'superagent';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { id } = req.query;
  try {
    const [artistRes, albumsRes] = await Promise.all([
      request
        .get(`https://api.spotify.com/v1/artists/${id}`)
        .set('Authorization', `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`),
      request
        .get(`https://api.spotify.com/v1/artists/${id}/albums`)
        .set('Authorization', `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`)
        .query({
          album_type: 'album',
          limit: req.query.limit,
          offset: req.query.offset
        })
    ]);
    res.status(200).json({
      artist: artistRes.body,
      albums: {
        items: albumsRes.body.items,
        limit: albumsRes.body.limit,
        offset: albumsRes.body.offset,
        total: albumsRes.body.total
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
} 