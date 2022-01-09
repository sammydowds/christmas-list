import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../../utils/ironOptions'
import dbConnect from '../../../utils/dbConnect'
import Family from '../../../models/Family'
import User from '../../../models/User'

export default withIronSessionApiRoute(deleteMemberRoute, ironOptions)

async function deleteMemberRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req
  switch (method) {
    case 'POST':
      const ironUser = req.session.user
      const { id } = req.body
      if (ironUser) {
        if (id) {
          try {
            await dbConnect()
            const family = await Family.findById(id).exec()
            const user = await User.findById(ironUser._id).exec()
            if (family && user) {

              // remove ids 
              const newMembers = family.members.filter((userId: mongoose.ObjectId) => userId.toString() !== user._id.toString())
              const newFamilies = user.families.filter((familyId: mongoose.ObjectId) => familyId.toString() !== family._id.toString())

              // update and save
              family.members = newMembers
              user.families = newFamilies

              // remove family if no members exist
              if (family.members.length === 0) {
                await family.remove()
              } else {
                await family.save()
              }
              await user.save()

              res.status(200).json({ success: true })
            } else {
              res.status(400).json({ error: 'An error occurred while trying to delete this family.'})
            }
          } catch(err) {
            res.status(500).json({ error: 'Error while removing family.', message: err})
          }
        } else {
          res.status(400).json({ error: 'Bad request'})
        }
      } else {
        res.status(401).json({ error: 'Not authorized'})
      }
      break
  }
}