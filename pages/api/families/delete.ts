import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../../utils/ironOptions'
import dbConnect from '../../../utils/dbConnect'

export default withIronSessionApiRoute(deleteMemberRoute, ironOptions)

async function deleteMemberRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req
  switch (method) {
    case 'POST':
      const ironUser = req.session.user
      if (ironUser) {
        try {
          await dbConnect()
        } catch(err) {
          res.status(500).json({ error: 'We could not add a present to your wishlist.', message: err})
        }
        
      } else {
        res.status(401).json({ error: 'Not authorized'})
      }
      break
  }
}