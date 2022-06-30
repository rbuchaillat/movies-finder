import type { NextApiRequest, NextApiResponse } from 'next';
import { MovieDatabase } from '../../src/utils/movieDb';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await MovieDatabase.getDb().movieTopRated();
    res.status(200).json(result.results?.splice(0, 10));
  } catch (error) {
    res.status(500).json({ error });
  }
}
