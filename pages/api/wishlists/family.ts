import Family from '../../../models/Family'
import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../../utils/ironOptions'
import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/User'
import Present from '../../../models/Present'

export default withIronSessionApiRoute(wishlistRoute, ironOptions)

async function wishlistRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const userId = req.session.user?._id
    const id = req.session.user?.family
    await dbConnect()
    // check if passcode exists for family
    Family.findOne({ id: id }).exec(async function (err, data) {
      if (err) {
        res.status(400).json({ error: 'Error while fetching family data', message: err })
      }
      if (data) {
        // find users
        const users = await User.find().where('_id').in(data.members).populate('wishlist').exec();
        // filter out user who made request
        const otherUsers = users.filter((user) => {
          return user._id.toString() !== userId
        })
        let wishlistByName: any = {}
        for (let user of otherUsers) {
          // find presents
          const presents = await Present.find().where('_id').in(user.wishlist).exec();
          wishlistByName[user?.email] = presents
        }
        res.status(200).json(wishlistByName)
      }
      res.status(400).json({ error: 'Family not found.' })
    })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
