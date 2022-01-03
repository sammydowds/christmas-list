import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../models/User'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../../utils/ironOptions'
import dbConnect from '../../../utils/dbConnect'
import Present from '../../../models/Present'

export default withIronSessionApiRoute(deleteRoute, ironOptions)

async function deleteRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req
  switch (method) {
    case 'POST':
      const { id } = req.body
      const ironUser = req.session.user
      if (id && ironUser) {
        try {
          await dbConnect()
          await Present.findById(id).remove().exec()
          res.status(200).json({ success: true })
        } catch {
          res.status(500).json({ error: 'Could not delete present.'})
        }
      } else {
        res.status(400).json({ error: 'Bad request'})
      }
      break
  }
}
