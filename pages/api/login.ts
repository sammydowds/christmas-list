import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/User'
import dbConnect from '../../utils/dbConnect'
import { withIronSessionApiRoute } from 'iron-session/next'

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
	User.findOne({name: username}, (err, user) => {
	  if (err) res.status(400).json({error: 'Password or Username is incorrect'});
	  user.comparePassword(password, (err, isMatch) =>{
	    if (err) res.status(400).json({error: 'Password or Username is incorrect'});
	    // create session for user using iron-session
	    req.session.user = user
	    await req.session.save();
	    res.json(user);
	    // redirect if match
	  })
	})
	break
    }
  }
);
