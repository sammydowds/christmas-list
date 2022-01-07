import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../../utils/ironOptions'
import dbConnect from '../../../utils/dbConnect'
import { userInfo } from 'os'
import User from '../../../models/User'
import Family from '../../../models/Family'
import mongoose from 'mongoose'

export default withIronSessionApiRoute(addMemberRoute, ironOptions)

async function addMemberRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req
  switch (method) {
    case 'POST':
      const ironUser = req.session.user
      const { passcode } = req.body
      if (ironUser) {
        try {
          await dbConnect()
          const family = await Family.findOne({ passcode: passcode }).exec()
          const user = await User.findById(ironUser._id).exec()
          if (family && user && !(user._id in family.members)) {
              const newMembers = family.members.filter((userId: mongoose.ObjectId) => userId !== user._id)
              const newFamilies = user.families.filter((familyId: mongoose.ObjectId) => familyId !== family._id)
              family.members = newMembers
              user.families = newFamilies
              await family.save()
              await user.save()
              res.status(200).json({ success: true })
          } else {
              res.status(400).json({ error: 'Error while looking up user and family'})
          }
        } catch(err) {
          res.status(500).json({ error: 'We could not complete this request to join this family.', message: err})
        }
      } else {
        res.status(401).json({ error: 'Not authorized'})
      }
      break
  }
}