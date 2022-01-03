import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../models/User'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../../utils/ironOptions'
import Present from '../../../models/Present'

export default withIronSessionApiRoute(claimRoute, ironOptions)

async function claimRoute(
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
          const user = await User.findById(ironUser._id).exec()
          const present = await Present.findById(id).exec()
          if (user && present) {
            // add present to shopping list
            user.shoppingList.push(id)
            await user.save()
            present.from = user.name
            await present.save()
            res.status(200).json({ success: true })
          } else {
            res.status(400).json({ error: 'Error while fetching user and present data'})
          }
        } catch {
          res.status(500).json({ error: 'Unable to claim present.'})
        }
      } else {
        res.status(400).json({ error: 'Bad request'})
      }
      break
  }
}
