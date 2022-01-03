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
  switch (method) {
    case 'POST':
      const { password, email } = await req.body;
      try {
        await dbConnect()
        const user = await User.findOne({ email: email }).exec()
        if (user) {
          user.comparePasswords(password, async function (err: any, isMatch: boolean) {
            if (err) return res.status(400).json({ error: 'Uh oh. Something went wrong while checking your credentials'})
            if (!isMatch) {
              return res.status(400).json({error: 'Uh oh. Credentials do not match our records.'})
            }
            // start a session
            const ironUser = { isLoggedIn: true, ...user._doc}
            req.session.user = ironUser
            await req.session.save()
            return res.status(200).json(user)
          })
        } else {
          res.status(400).json({error: 'Uh oh. Credentials do not match our records.'})
        }
      } catch (error) {
        res.status(500).json({ error: 'Something went wrong while trying to log you in.', message: error })
      }
      break
    default:
      res.status(405).json({ error: 'Bad Request' })
      break
  }
}
