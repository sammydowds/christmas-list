import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../utils/ironOptions'
import User from '../../models/User'
import Present from '../../models/Present'

export default withIronSessionApiRoute(wishlistRoute, ironOptions)

async function wishlistRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const wishlistPresentIds = req.session.user?.wishlist
  if (wishlistPresentIds) {
    Present.find().where('_id').in(wishlistPresentIds).exec(async function(err, data) {
        if (err) {
            res.status(400).json({ error: 'Error while fetching wishlist.'})
        } 
        if (data) {
            res.status(200).json(data)
        }
    })
  } else {
      res.status(401).json({ error: 'Not authorized' })
  }
}