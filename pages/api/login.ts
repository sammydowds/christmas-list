import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/User'
import dbConnect from '../../utils/dbConnect'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../utils/ironOptions'

export default withIronSessionApiRoute(loginRoute, ironOptions)

async function loginRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req
  await dbConnect()
  switch (method) {
    case 'POST':
      const { password, email } = await req.body;
      try {
        User.findOne({ email: email }).exec((err, user) => {
          if (err) {
            res.status(400).json({ error: 'Uh oh. Something went wrong while checking your credentials.' })
          } else if (!user) {
            res.status(400).json({ error: 'Uh oh. Our elves found that your credentials were incorrect.' })
          } else {
            user.comparePasswords(password, async (matchError: any, isMatch: boolean) => {
              if (matchError) {
                res.status(400).json({ error: 'Uh oh. Something went wrong while checking your credentials.' })
              } else if (!isMatch) {
                res.status(400).json({ error: 'Credentials were found to not match.' })
              } else {
                // start a session
                const ironUser = { isLoggedIn: true, email: user.email, id: user._id, familyId: user.family}
                req.session.user = ironUser
                await req.session.save()
                res.status(200).json(user)
              }
            })
          }
        })
      } catch (error) {
        res.status(500).json({ error: 'Something went wrong while trying to log you in.', message: error })
      }
      break
    default:
      res.status(405).json({ error: 'Bad Request' })
      break
  }
}
