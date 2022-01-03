import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../models/User'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../../utils/ironOptions'
import Present from '../../../models/Present'
import dbConnect from '../../../utils/dbConnect'

export default withIronSessionApiRoute(addRoute, ironOptions)

async function addRoute(
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
          const { description } = req.body
          const present = new Present({ description: description, to: ironUser.name })
          await present.save()
          if (present._id) {
            const user = await User.findById(ironUser._id).exec()
            user.wishlist.push(present._id)
            await user.save()
            res.status(200).json({ success: true })
          }
        } catch(err) {
          res.status(500).json({ error: 'We could not add a present to your wishlist.', message: err})
        }
        
      } else {
        res.status(401).json({ error: 'Not authorized'})
      }
      break
  }
}
