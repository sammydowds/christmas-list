import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../utils/ironOptions";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../../models/User";
import dbConnect from "../../utils/dbConnect";

// TODO: type the User here

export default withIronSessionApiRoute(userRoute, ironOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  switch (method) {
    case 'GET':
      if (req.session.user) {
        // TODO: may need to fetch more info if scoping the User down is Session
        res.json({
          ...req.session.user,
        });
      } else {
        res.json({});
      }
      break
    case 'POST':
      // get form data
      await dbConnect()
      const { email, password } = req.body
      // check if family code is present
      // create Family instance and save
      // connect Family to User instance
      const newUser = new User({ email: email, password: password})
      await newUser.save()
      req.session.user = newUser
      await req.session.save()
      res.status(200).json(newUser)
      // Save User instance
      // add user iron session and save
      // send success response with user 
      break
  }
}
