import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/User'
import dbConnect from '../../utils/dbConnect'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../utils/ironOptions'

export default withIronSessionApiRoute(
  async function loginRoute(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    const { method } = req
    await dbConnect()
    switch (method) {
      case 'POST':
        const { password, email } = await req.body;
        User.findOne({email: email}).exec((err, user) => {
          if (err) {
            res.status(400).json({error: 'Uh oh. Something went wrong while checking your credentials.'})
          } else if (!user) {
            res.status(400).json({ error: 'Uh oh. Our elves found that your credentials were incorrect.'})
          } else {
            user.comparePasswords(password, (matchError, isMatch) => {
              if (matchError) {
                res.status(400).json({ error: 'Uh oh. Something went wrong while checking your credentials.'})
              } else if (!isMatch) {
                res.status(400).json({ error: 'Credentials were found to not match.'})
              } else {
                // start a session
                // @ts-ignore
                req.session.user = user
                res.status(200).json(user)
              }
            })
          }
        })
        break
      }
    }, 
    ironOptions
);
