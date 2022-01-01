import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../utils/ironOptions";
import { NextApiRequest, NextApiResponse } from "next";

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
      // check if family code is present
      // create Family instance and save
      // connect Family to User instance
      // Save User instance
      // add user iron session and save
      // send success response with user 
      break
  }
}
