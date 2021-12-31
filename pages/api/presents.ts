import type { NextApiRequest, NextApiResponse } from 'next'
import Present from '../../models/Presents'
import dbConnect from '../../utils/dbConnect'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req
  await dbConnect()
  switch (method) {
    case 'GET':
      try {
	const presents = await Present.find({}) 
	res.status(200).json({ data: presents })
      } catch(error) {
	res.status(400).json({ success: false, message: error })
      }
      break
  }
}
