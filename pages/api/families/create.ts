import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../../utils/ironOptions'
import dbConnect from '../../../utils/dbConnect'
import { userInfo } from 'os'
import User from '../../../models/User'
import Family from '../../../models/Family'
import mongoose from 'mongoose'
import { generateFamilyPasscode } from '../helpers'

export default withIronSessionApiRoute(createFamilyRoute, ironOptions)

async function createFamilyRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req
  switch (method) {
    case 'POST':
      const ironUser = req.session.user
      const { name } = req.body
      if (ironUser) {
        if (name) {
          try {
            await dbConnect()
            const user = await User.findById(ironUser._id).exec()
            if (user) {
              // create new family with name and associate user
              const passcode = generateFamilyPasscode()
              const newFamily = new Family({ name: name, passcode: passcode, members: [user._id] })
              await newFamily.save()

              user.families.push(newFamily._id)
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