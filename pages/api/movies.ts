import type { NextApiRequest, NextApiResponse } from 'next';
import { MovieDatabase } from '../../src/utils/movieDb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page, genres, ...rest } = req.query;

  try {
    const result = await MovieDatabase.getDb().discoverMovie({
      page: +page,
      with_genres: (genres as string) || '',
      ...rest,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
}
