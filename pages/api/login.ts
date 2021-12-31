import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/User'
import dbConnect from '../../utils/dbConnect'
import { withIronSessionApiRoute } from 'iron-session/next'

const IRON_SESSION_PASSWORD = process.env.PWORD_IRON_SESSION

export default withIronSessionApiRoute(
  async function loginRoute(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    const { method } = req
    await dbConnect()
    switch (method) {
      case 'POST':
	// TODO: pull form data
	const { password, username } = await req.body;
	// check user exists
	const user = await User.findOne({name: username})
	if (user && user.comparePasswords(password)) {
	  // create a session 
	  request.session.user = user
	  await request.session.save()
	  res.status(200).json(user)
	}
	res.status(400).json({error: 'Uh oh. Our elves had trouble validating your credentials!'})
	break
    }
  }, 
  {
    cookieName: "christmas_list",
    password: IRON_SESSION_PASSWORD,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
);
