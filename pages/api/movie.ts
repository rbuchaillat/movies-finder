import type { NextApiRequest, NextApiResponse } from 'next';
import { MovieDatabase } from '../../src/utils/movieDb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page, q } = req.query;

  try {
    const result = await MovieDatabase.getDb().searchMovie({
      page: +page,
      query: q as string,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
}
