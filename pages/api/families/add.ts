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
        if (passcode) {
          try {
            await dbConnect()
            const family = await Family.findOne({ passcode: passcode }).exec()
            const user = await User.findById(ironUser._id).exec()
            if (family && user) {
  
              // add ids and save
              family.members.push(user._id)
              user.families.push(family._id)
              await family.save()
              await user.save()
  
              res.status(200).json({ success: true })
            } else {
              res.status(400).json({ error: 'An error while adding you to this family.'})
            }
          } catch(err) {
            res.status(500).json({ error: 'We could not complete this request to join this family.', message: err})
          }
        } else {
          res.status(400).json({ error: 'Bad request.'})
        }
      } else {
        res.status(401).json({ error: 'Not authorized'})
      }
      break
  }
}