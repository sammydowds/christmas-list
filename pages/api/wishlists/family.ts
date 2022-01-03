import Family from '../../../models/Family'
import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../../utils/ironOptions'
import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/User'
import Present from '../../../models/Present'

export default withIronSessionApiRoute(wishlistsRoute, ironOptions)

async function wishlistsRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const ironUser = req.session.user
  if (ironUser) {
    try {
      await dbConnect()
      // check if passcode exists for family
      const family = await Family.findById(ironUser.family).exec()
      if (family) {
         // find users
         const users = await User.find().where('_id').in(family.members).populate('wishlist').exec();
         // filter out user who made request
         const otherUsers = users.filter((user) => {
           return user._id.toString() !== ironUser._id
         })
         let wishlistByName: any = {}
         for (let user of otherUsers) {
           // find presents
           const presents = await Present.find().where('_id').in(user.wishlist).exec();
           wishlistByName[user?.email] = presents
          }
        return res.status(200).json(wishlistByName)
      } else {
        return res.status(400).json({ error: 'Error fetching family wishlists.'})
      }
    } catch (err) {
      res.status(500).json({ error: err })
    }
  } else {
    res.status(401).json({ error: 'Not authorized'})
  }
  
}
