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
          const user = await User.findById(ironUser._id).exec()
          if (user) {
            // delete present ID from wishlist
            const newWishlist = user.wishlist.filter((presentId: string) => {
              return presentId !== id
            })
            user.wishlist = newWishlist
            await user.save()
            await Present.findById(id).remove().exec()
            res.status(200).json({ success: true })
          } else {
            res.status(400).json({ error: 'There was an issue while finding user.'})
          }
        } catch {
          res.status(500).json({ error: 'Could not delete present.'})
        }
      } else {
        res.status(400).json({ error: 'Bad request'})
      }
      break
  }
}
