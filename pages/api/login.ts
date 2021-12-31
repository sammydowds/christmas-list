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
        try {
          const { password, username } = await req.body;
          // check user exists
          const user = await User.findOne({name: username}).exec()
          if (user && user.comparePasswords(password)) {
            // create a session 
            // @ts-ignore
            req.session.user = user
            await req.session.save()
            res.status(200).json(user)
          }
          res.status(400).json({error: 'Uh oh. Our elves had trouble validating your credentials!'})
          break
        } catch(error) {
          res.status(500).json({error: 'Uh oh. The Northpole servers are having issues.'})
        }
      }
    }, 
    ironOptions
);
